from fastapi import APIRouter, HTTPException
from app.models.schemas import EmbeddingCompareRequest, EmbeddingCompareResponse
from app.services.embedding_service import embedding_service
from app.utils.logger import logger

router = APIRouter(prefix="/api", tags=["Task 5 - Embedding Model Comparison"])

@router.post("/embedding-compare", response_model=EmbeddingCompareResponse)
async def compare_embedding(req: EmbeddingCompareRequest = EmbeddingCompareRequest()):
    """Task 5: So sánh 2 mô hình Embedding (bge-small-en-v1.5 vs all-MiniLM-L6-v2) về thời gian index, latency và top score"""
    try:
        results = embedding_service.compare_embedding_models(
            query=req.query,
            models=req.models
        )
        return results
    except Exception as e:
        logger.error(f"Lỗi thực nghiệm Embedding: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Lỗi thực nghiệm Embedding: {str(e)}")
