import re


input_file = r"C:\Users\Florian\Downloads\PLAN DE ESTUDIOS DE INGENIERÍA INFORMÁTICA  2024-F.md"
output_file = r"C:\Users\Florian\Downloads\cursos_extraidos.txt"


curso_pattern = re.compile(r"\|\s*[A-Z0-9]+\s*\|\s*([^|]+?)\s*\|")


cursos = []


with open(input_file, "r", encoding="utf-8") as file:
    for line in file:
        match = curso_pattern.search(line)
        if match:
            cursos.append(match.group(1).strip())


with open(output_file, "w", encoding="utf-8") as file:
    file.write("\n".join(cursos))

print(f"Extracción completada. Los nombres de los cursos se guardaron en: {output_file}")
