import React from 'react'
import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router'

const BackButton = () => {
    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate('/');
    }
  return (
    <div>
      <button
                    onClick={handleGoBack}
                    className="btn btn-outline mb-6 flex items-center gap-2"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Notes
                </button>
    </div>
  )
}

export default BackButton
