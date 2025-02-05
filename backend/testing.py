# from transformers import pipeline
# from arabic_reshaper import reshape
# from bidi.algorithm import get_display
# from models import translation_transformers, ocr_extracted_text
import os


# try:
#     translation_en_to_de = pipeline('translation', model='Tanhim/translation-En2De', tokenizer='Tanhim/translation-En2De')
#     translated_text = translation_en_to_de('Hello my name is Musab.')[0]['translation_text']
#     print(translated_text)
# except:
#     pass


# if reader.readtext('dummy2.png'):



# try:
#     translation_ur=pipeline("translation", model="Helsinki-NLP/opus-mt-en-ur")
#     text = translation_ur("Hello, name is Musab.")[0]['translation_text']
#     reshaped_text = reshape(text)
#     bidi_text = get_display(reshaped_text)
#     print(bidi_text)
# except:
#     pass

# text_string = "آکاش کمار".decode()
# print (text_string)


# text = "یہ اردو کا متن ہے"
# reshaped_text = reshape(text)
# bidi_text = get_display(reshaped_text)
# print(bidi_text)

# text, urdu_text = translation_transformers('Hello, my name is Musab')
# print(text,urdu_text)


# text = ocr_extracted_text('uploads/practice.png')
# translated_text = translation_transformers(text)
# print(translated_text)


# print(uploads)
file_removing = 'practice.jpg'
uploads = os.listdir('uploads/')
for upload in uploads:
    try:
        if file_removing == upload:
            os.remove(f'uploads/{file_removing}')
    except:
        print('file is already removed.')
# os.remove('uploads/Getting the Interview.pdf')