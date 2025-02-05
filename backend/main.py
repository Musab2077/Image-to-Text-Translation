from fastapi import FastAPI,File,UploadFile
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import os
import shutil
from backend.backend.models import translation_transformers,ocr_extracted_text

class Image(BaseModel):
    path : str

class Translation(BaseModel):
    filename : str
    language : str = 'ur'

app = FastAPI()

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    file_location = f"{UPLOAD_DIR}/{file.filename}"
    with open(file_location, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    uploads = os.listdir('uploads/')
    for upload in uploads:
        if file.filename != upload:
            os.remove(f'uploads/{upload}')

    return {"filename": file.filename, "message": "File uploaded successfully"}

@app.post('/translation')
def translation(translation : Translation):
    text = ocr_extracted_text(f'uploads/{translation.filename}')
    translated_text = translation_transformers(text,translation.language)
    print(translated_text)
    return { 'translation' : translated_text }