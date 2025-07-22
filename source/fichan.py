import pdfplumber
import csv
import re
from collections import defaultdict

pdf_path = "mallasCurriculares\\mallasIngenieriaInformatica\\MifichadeN.pdf"
notas = []

regex_codigo = re.compile(r'^(C|U)\d{4,5}')
regex_datos = re.compile(r'(--|\d{1,2}\.\d{2})\s+\d\s+\d\s+\*.+?\*')

def deducir_estado(nota, observacion):
    if nota == "--":
        return "Retirado"
    elif float(nota) >= 11:
        return "Aprobado"
    else:
        return "Desaprobado"

with pdfplumber.open(pdf_path) as pdf:
    for page in pdf.pages:
        texto = page.extract_text()
        if not texto:
            continue

        lineas = texto.split("\n")
        i = 0
        while i < len(lineas):
            linea = lineas[i].strip()

            if regex_codigo.match(linea):
                bloque = linea
                i += 1

                # Unir líneas hasta encontrar datos válidos
                while i < len(lineas) and not regex_datos.search(bloque):
                    siguiente = lineas[i].strip()
                    bloque += " " + siguiente
                    i += 1

                if not regex_datos.search(bloque):
                    print("❌ No se pudo procesar bloque:", bloque[:80])
                    continue

                bloque = re.sub(r'\s+', ' ', bloque)

                # Ajuste: buscar desde el código hasta el patrón final de nota, créditos, observación
                final_match = re.search(r'(--|\d{1,2}\.\d{2})\s+(\d)\s+(\d)\s+\*(.*?)\*', bloque)

                if final_match:
                    codigo_match = re.match(r'^((C|U)\d{4,5})', bloque)
                    if not codigo_match:
                        print("❌ Código no encontrado en bloque:", bloque[:80])
                        continue

                    codigo = codigo_match.group(1)
                    nota = final_match.group(1)
                    creditos = int(final_match.group(2))
                    nivel = int(final_match.group(3))
                    observacion = final_match.group(4).strip()

                    # Cortamos el nombre entre el código y el inicio de la nota
                    inicio = bloque.find(codigo) + len(codigo)
                    fin = final_match.start()
                    nombre = bloque[inicio:fin].strip()

                    estado = deducir_estado(nota, observacion)

                    notas.append({
                        "Código": codigo,
                        "Nombre": nombre,
                        "Nota": nota,
                        "Créditos": creditos,
                        "Nivel": nivel,
                        "Observación": observacion,
                        "Estado": estado
                    })
                else:
                    print("❌ Error al interpretar bloque:", bloque[:80])
            else:
                i += 1

# Guardar CSV limpio
with open("notas_usuario.csv", "w", newline="", encoding="utf-8") as f:
    writer = csv.DictWriter(f, fieldnames=["Código", "Nombre", "Nota", "Créditos", "Nivel", "Observación", "Estado"])
    writer.writeheader()
    writer.writerows(notas)

# Sumar créditos de cursos (sin duplicar si ya fue aprobado)
def nota_a_num(nota):
    try:
        return float(nota)
    except ValueError:
        return 0.0  # Para "--" u otros no numéricos

creditos_por_curso = {}
for curso in notas:
    codigo = curso["Código"]
    nota_num = nota_a_num(curso["Nota"])

    if (
        codigo not in creditos_por_curso
        or nota_num > nota_a_num(creditos_por_curso[codigo]["Nota"])
    ):
        creditos_por_curso[codigo] = curso

# ✅ Aquí calculamos correctamente la suma total de créditos
total_creditos = sum(int(curso["Créditos"]) for curso in creditos_por_curso.values())

print(f"🔢 Total de créditos cursados (últimos intentos por curso): {total_creditos}")
print(f"✅ {len(notas)} cursos (intentos totales) extraídos y y guardados en 'notas_usuario.csv'")
