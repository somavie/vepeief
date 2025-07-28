"use client"

import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { SurveyData } from "@/app/page"

interface AdditionalCommentsSectionProps {
  data: SurveyData
  onChange: (data: SurveyData) => void
}

export function AdditionalCommentsSection({ data, onChange }: AdditionalCommentsSectionProps) {
  const updateData = (field: keyof SurveyData, value: string) => {
    onChange({ ...data, [field]: value })
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="additionalComments" className="text-amber-800 font-medium">
          Comentários ou observações adicionais sobre as vibrações ou sobre o edifício
        </Label>
        <Textarea
          id="additionalComments"
          value={data.additionalComments}
          onChange={(e) => updateData("additionalComments", e.target.value)}
          placeholder="Partilhe qualquer informação adicional que considere relevante..."
          className="border-amber-200 focus:border-amber-400 min-h-[120px]"
        />
      </div>

      <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
        <p className="text-sm text-amber-700">
          <strong>Obrigado pela sua participação!</strong> As suas respostas são muito valiosas para este estudo
          académico sobre vibrações em edifícios residenciais.
        </p>
      </div>
    </div>
  )
}
