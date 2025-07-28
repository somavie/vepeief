"use client"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import type { SurveyData } from "@/app/page"

interface QualityOfLifeSectionProps {
  data: SurveyData
  onChange: (data: SurveyData) => void
}

export function QualityOfLifeSection({ data, onChange }: QualityOfLifeSectionProps) {
  const updateData = (field: keyof SurveyData, value: string) => {
    onChange({ ...data, [field]: value })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Label className="text-amber-800 font-medium">
          As vibrações afetam o seu conforto ou o da sua família no dia a dia?
        </Label>
        <RadioGroup
          value={data.comfortImpact}
          onValueChange={(value) => updateData("comfortImpact", value)}
          className="space-y-2"
        >
          {["Sim, significativamente", "Sim, moderadamente", "Sim, levemente", "Não afetam"].map((option) => (
            <div key={option} className="flex items-center space-x-2">
              <RadioGroupItem value={option} id={option} className="text-amber-600" />
              <Label htmlFor={option} className="text-sm text-amber-700 cursor-pointer">
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-3">
        <Label className="text-amber-800 font-medium">
          As vibrações já causaram preocupação com a segurança estrutural do edifício?
        </Label>
        <RadioGroup
          value={data.safetyWorries}
          onValueChange={(value) => updateData("safetyWorries", value)}
          className="space-y-2"
        >
          {["Sim, muita preocupação", "Sim, alguma preocupação", "Não, nenhuma preocupação"].map((option) => (
            <div key={option} className="flex items-center space-x-2">
              <RadioGroupItem value={option} id={option} className="text-amber-600" />
              <Label htmlFor={option} className="text-sm text-amber-700 cursor-pointer">
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label htmlFor="avoidedAreas" className="text-amber-800 font-medium">
          Já evitou usar alguma área do edifício devido às vibrações?
        </Label>
        <Textarea
          id="avoidedAreas"
          value={data.avoidedAreas}
          onChange={(e) => updateData("avoidedAreas", e.target.value)}
          placeholder="Se sim, especifique quais áreas..."
          className="border-amber-200 focus:border-amber-400 min-h-[80px]"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="reportedProblem" className="text-amber-800 font-medium">
          Já reportou este problema à administração do condomínio?
        </Label>
        <Textarea
          id="reportedProblem"
          value={data.reportedProblem}
          onChange={(e) => updateData("reportedProblem", e.target.value)}
          placeholder="Se sim, qual foi a resposta/ação tomada?"
          className="border-amber-200 focus:border-amber-400 min-h-[80px]"
        />
      </div>
    </div>
  )
}
