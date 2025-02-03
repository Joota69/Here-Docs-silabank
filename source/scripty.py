import re

# Ruta del archivo de entrada y salida
input_file = r"C:\Users\Florian\Downloads\mallasIngenieriaAmbiental\PLAN DE ESTUDIOS ING. AMBIENTAL 2023-F.md"
output_file = r"C:\Users\Florian\Downloads\cursos_por_ciclo.txt"

# Expresión regular para detectar ciclos y cursos
ciclo_pattern = re.compile(r"\*\*(.*?) CICLO\*\*")
curso_pattern = re.compile(r"\|\s*[\w\s/]+\s*\|\s*([^\|]+?)\s*\|")

# Diccionario para almacenar los cursos por ciclo
cursos_por_ciclo = {}

with open(input_file, "r", encoding="utf-8") as file:
    lines = file.readlines()

current_ciclo = None

for line in lines:
    ciclo_match = ciclo_pattern.search(line)
    curso_match = curso_pattern.search(line)

    if ciclo_match:
        current_ciclo = ciclo_match.group(1).strip()
        cursos_por_ciclo[current_ciclo] = []
    
    if current_ciclo and curso_match:
        curso = curso_match.group(1).strip()
        cursos_por_ciclo[current_ciclo].append(curso)

# Escribir la salida en un archivo de texto
with open(output_file, "w", encoding="utf-8") as file:
    for ciclo, cursos in cursos_por_ciclo.items():
        file.write(f"{ciclo}\n")
        for curso in cursos:
            file.write(f"{curso}\n")
        file.write("\n")

print(f"Archivo generado: {output_file}")
