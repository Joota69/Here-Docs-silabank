import pdfplumber
import csv
import re

# Ruta al PDF
pdf_path = "mallasCurriculares/mallasIngenieriaInformatica/PE-DUGAD-023 INGENIERÍA INFORMÁTICA.pdf"

# Lista de ciclos (todos en mayúsculas para búsqueda robusta)
ciclos = [
    "PRIMER CICLO", "SEGUNDO CICLO", "TERCER CICLO", "CUARTO CICLO",
    "QUINTO CICLO", "SEXTO CICLO", "SÉTIMO CICLO", "OCTAVO CICLO",
    "NOVENO CICLO", "DÉCIMO CICLO"
]

obligatorios = []
electivos = []

modo = "obligatorios"
ciclo_actual = "Sin Ciclo"

def limpiar(texto):
    return re.sub(r'\s+', ' ', texto).strip()

def agrupar_cursos(lineas):
    cursos = []
    bloque = ""
    for linea in lineas:
        linea = limpiar(linea)
        linea_mayus = linea.upper()

        # Detectar cambio de ciclo
        global ciclo_actual
        for ciclo in ciclos:
            if ciclo in linea_mayus:
                ciclo_actual = ciclo.title()
                break

        # Ignorar encabezados basura
        if any(p in linea_mayus for p in [
            "ASIGNATURAS", "HORAS LECTIVAS", "CRÉDITOS ACADÉMICOS", "TOTAL DE",
            "MODALIDAD", "TIPO DE ESTUDIO", "P V T", "CÓDIGO NOMBRE DE LA ASIGNATURA",
            "TIPO DE ESTUDIOS", "PRE-REQUISITO", "ESTUDIO OTORGADOS"
        ]):
            continue

        if "ASIGNATURAS ELECTIVAS" in linea_mayus:
            global modo
            modo = "electivos"
            continue

        # Nuevo curso
        if re.match(r'^[A-Z]\d{4,5}', linea):
            if bloque:
                cursos.append((bloque.strip(), ciclo_actual, modo))
            bloque = linea
        else:
            if bloque:
                bloque += " " + linea
    if bloque:
        cursos.append((bloque.strip(), ciclo_actual, modo))
    return cursos

with pdfplumber.open(pdf_path) as pdf:
    for page in pdf.pages:
        texto = page.extract_text()
        lineas = texto.split("\n")
        cursos_lineas = agrupar_cursos(lineas)

        for linea, ciclo, modo_curso in cursos_lineas:
            if modo_curso == "obligatorios":
                match = re.match(r'^(C\d{4,5})\s+(.+?)\s+(PRESENCIAL|NO PRESENCIAL|SEMIPRESENCIAL)', linea, re.IGNORECASE)
                if match:
                    codigo = match.group(1)
                    resto = linea[len(codigo):].strip().upper()

                    # Nombre del curso (estrategias)
                    nombre_match = re.search(r'^(.+?)\s+(?:GENERAL|ESPECÍFICO|DE ESPECIALIDAD)', resto)
                    if not nombre_match:
                        nombre_match = re.search(r'^(.+?)\s+(?:OBLIGATORIO|ELECTIVO)', resto)
                    if not nombre_match:
                        nombre_match = re.search(r'^(.+?)\s+\d{1,2}\s+\d{1,2}\s+\d{1,2}$', resto)
                    nombre_curso = nombre_match.group(1).strip() if nombre_match else "N/A"

                    # Créditos
                    creditos_match = re.findall(r'(\d+)\s*$', linea)
                    creditos = int(creditos_match[-1]) if creditos_match else 0

                    # Prerrequisito
                    prerrequisito = "NINGUNO"
                    prereq_match = re.search(r'(?:OBLIGATORIO|ELECTIVO)\s+(.*?)\s+\d{1,2}\s+\d{1,2}\s+\d{1,2}', linea, re.IGNORECASE)
                    if prereq_match:
                        prerrequisito = prereq_match.group(1).strip()

                    obligatorios.append({
                        "Código": codigo,
                        "Nombre": nombre_curso,
                        "Ciclo": ciclo,
                        "Créditos": creditos,
                        "Prerrequisitos": prerrequisito,
                        "Categoría": "Obligatorio"
                    })

            elif modo_curso == "electivos":
                match = re.match(r'^\d+\s+(.+?)\s+3\s+DE ESPECIALIDAD ELECTIVO\s+\d+', linea.upper())
                if match:
                    nombre = match.group(1).strip()
                    prerrequisito_match = re.search(r'64\s+(.*)', linea)
                    prerrequisito = prerrequisito_match.group(1).strip() if prerrequisito_match else "NINGUNO"
                    codigo = f"ELEC{len(electivos)+1:03d}"
                    electivos.append({
                        "Código": codigo,
                        "Nombre": nombre,
                        "Créditos": 3,
                        "Prerrequisitos": prerrequisito,
                        "Categoría": "Electivo"
                    })

# Guardar CSVs
with open("malla_obligatorios.csv", "w", newline="", encoding="utf-8") as f:
    writer = csv.DictWriter(f, fieldnames=["Código", "Nombre", "Ciclo", "Créditos", "Prerrequisitos", "Categoría"])
    writer.writeheader()
    writer.writerows(obligatorios)

with open("malla_electivos.csv", "w", newline="", encoding="utf-8") as f:
    writer = csv.DictWriter(f, fieldnames=["Código", "Nombre", "Créditos", "Prerrequisitos", "Categoría"])
    writer.writeheader()
    writer.writerows(electivos)

print("✅ ¡Parser ejecutado correctamente! Cursos extraídos y guardados en CSVs.")
