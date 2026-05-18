import { useState } from 'react'

export const useImageSelectorComponent = (initialImages = []) => {
  const [images, setImages] = useState(initialImages)
  const [coverIndex, setCoverIndex] = useState(0)
  const [newImageUrl, setNewImageUrl] = useState('')

  const handleAddImageUrl = () => {
    const url = newImageUrl.trim()
    if (!url) return
    setImages(prev => [...prev, { url, file: null, isNew: false }])
    setNewImageUrl('')
  }

  const handleRemoveImage = (index) => {
    setImages(prev => {
      const next = prev.filter((_, i) => i !== index)
      if (coverIndex === index) setCoverIndex(0)
      else if (coverIndex > index) setCoverIndex(c => c - 1)
      return next
    })
  }

  const handleSetCover = (index) => setCoverIndex(index)

  const hasImages = images.length > 0

  return {
    images, setImages,
    coverIndex, setCoverIndex,
    newImageUrl, setNewImageUrl,
    handleAddImageUrl, handleRemoveImage, handleSetCover,
    hasImages
  }
}
