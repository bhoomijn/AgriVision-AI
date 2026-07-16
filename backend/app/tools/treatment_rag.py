from langchain_core.documents import Document
from langchain_community.vectorstores import Chroma
try:
    from langchain_community.embeddings import FakeEmbeddings
except:
    from langchain_core.embeddings.fake import FakeEmbeddings
TREATMENTS = [
    "Bacterial Blight: Neem oil 5ml/L, Streptomycin 0.5g/L. Preventive: Crop rotation.",
    "Late Blight: Mancozeb 2.5g/L. Preventive: Avoid waterlogging.",
    "Powdery Mildew: Baking soda 10g/L. Tebuconazole 1ml/L.",
    "Early Blight: Chlorothalonil. Remove debris.",
]
def get_vectorstore():
    docs=[Document(page_content=t) for t in TREATMENTS]
    return Chroma.from_documents(docs, FakeEmbeddings(size=1536), collection_name="treatments")