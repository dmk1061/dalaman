import pypdf
import os
import shutil

pdf_path = "tmp/whitepaper_security.pdf"
dest_pdf_path = "vibe_coding_agent_security_and_evaluation.pdf"
output_txt_path = "tmp/extracted_security_text.txt"

# 1. Копируем оригинал PDF в корень проекта, как просил пользователь
try:
    shutil.copy(pdf_path, dest_pdf_path)
    print(f"Copied original PDF to: {dest_pdf_path}")
except Exception as e:
    print(f"Failed to copy PDF: {e}")

# 2. Извлекаем текст
def extract_text_from_pdf(pdf_path, output_txt_path):
    print("Extracting text from PDF...")
    reader = pypdf.PdfReader(pdf_path)
    num_pages = len(reader.pages)
    print(f"Total pages: {num_pages}")
    
    extracted_pages = []
    for i, page in enumerate(reader.pages):
        text = page.extract_text()
        extracted_pages.append(f"--- PAGE {i+1} ---\n{text}")
        if (i+1) % 10 == 0:
            print(f"Extracted {i+1}/{num_pages} pages...")
            
    with open(output_txt_path, 'w', encoding='utf-8') as f:
        f.write("\n\n".join(extracted_pages))
        
    print(f"Extracted text successfully saved to {output_txt_path}")
    print(f"Txt file size: {os.path.getsize(output_txt_path)} bytes")

if __name__ == "__main__":
    extract_text_from_pdf(pdf_path, output_txt_path)
