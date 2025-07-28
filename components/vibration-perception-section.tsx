"use client"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import type { SurveyData } from "@/app/page"

interface VibrationPerceptionSectionProps {
  data: SurveyData
  onChange: (data: SurveyData) => void
}

export function VibrationPerceptionSection({ data, onChange }: VibrationPerceptionSectionProps) {
  const updateData = (field: keyof SurveyData, value: string) => {
    onChange({ ...data, [field]: value })
  }

  const updateArrayData = (field: keyof SurveyData, value: string, checked: boolean) => {
    const currentArray = (data[field] as string[]) || []
    if (checked) {
      onChange({ ...data, [field]: [...currentArray, value] })
    } else {
      onChange({ ...data, [field]: currentArray.filter((item) => item !== value) })
    }
  }

  const vibrationLocations = [
    "Sala de estar",
    "Quartos",
    "Cozinha",
    "Corredores dentro do apartamento",
    "Escadas internas do apartamento",
    "Escadas de acesso comum do edifício",
    "Halls de elevadores",
    "Áreas de lazer (ginásio, salão de festas, etc.)",
  ]

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Label className="text-amber-800 font-medium">Já percebeu alguma vibração incomum nos pisos ou escadas?</Label>
        <RadioGroup
          value={data.hasPerceivedVibrations}
          onValueChange={(value) => updateData("hasPerceivedVibrations", value)}
          className="space-y-2"
        >
          {["Sim", "Não", "Não tenho certeza"].map((option) => (
            <div key={option} className="flex items-center space-x-2">
              <RadioGroupItem value={option} id={option} className="text-amber-600" />
              <Label htmlFor={option} className="text-sm text-amber-700 cursor-pointer">
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>
        {data.hasPerceivedVibrations === "Não" && (
          <p className="text-sm text-amber-600 bg-amber-50 p-3 rounded-md">
            Se respondeu "Não", pode pular para a última seção (Comentários)
          </p>
        )}
      </div>

      {data.hasPerceivedVibrations === "Sim" && (
        <>
          <div className="space-y-3">
            <Label className="text-amber-800 font-medium">Com que frequência percebe essas vibrações?</Label>
            <RadioGroup
              value={data.vibrationFrequency}
              onValueChange={(value) => updateData("vibrationFrequency", value)}
              className="space-y-2"
            >
              {["Diariamente", "Semanalmente", "Mensalmente", "Raramente", "Apenas em situações específicas"].map(
                (option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <RadioGroupItem value={option} id={option} className="text-amber-600" />
                    <Label htmlFor={option} className="text-sm text-amber-700 cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ),
              )}
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <Label className="text-amber-800 font-medium">
              Em quais locais percebe as vibrações com mais intensidade?
              <span className="text-sm font-normal text-amber-600">(Pode marcar várias opções)</span>
            </Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {vibrationLocations.map((location) => (
                <div key={location} className="flex items-center space-x-2">
                  <Checkbox
                    id={location}
                    checked={(data.vibrationLocations || []).includes(location)}
                    onCheckedChange={(checked) => updateArrayData("vibrationLocations", location, checked as boolean)}
                    className="border-amber-300 data-[state=checked]:bg-amber-600"
                  />
                  <Label htmlFor={location} className="text-sm text-amber-700 cursor-pointer">
                    {location}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
