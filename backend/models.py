from transformers import pipeline,set_seed,MBart50TokenizerFast, MBartForConditionalGeneration
from arabic_reshaper import reshape
from bidi.algorithm import get_display
import easyocr

reader=easyocr.Reader(['en'],gpu=False)

def ocr_extracted_text(image:str):
    text=' '
    for result in reader.readtext(image):
        txt=result[1]+' '
        # print(txt)
        texts=text+txt
        text=texts
    return text

def loading_model(language:str = 'ur'):
    translation_en_to_ur = pipeline("translation", model="Helsinki-NLP/opus-mt-en-ur")
    translation_en_to_de = pipeline('translation', model='Tanhim/translation-En2De', tokenizer='Tanhim/translation-En2De')
    if language == 'de':
        return translation_en_to_de
    return translation_en_to_ur

def translation_transformers(text:str , language:str = 'ur'):
    try:
        translation_model = loading_model(language)
        results = translation_model(text)
        if language == 'de':
            return results[0]['translation_text']
        
        translated_text = results[0]['translation_text']
        reshaped_text = reshape(translated_text)
        urdu_text = get_display(reshaped_text)
        return translated_text
    except:
        pass


# translated_text = translation_transformers('Hello, my name is musab','de')
# print(translated_text)

