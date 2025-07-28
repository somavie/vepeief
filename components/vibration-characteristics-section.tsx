"use client"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import type { SurveyData } from "@/app/page"

interface VibrationCharacteristicsSectionProps {
  data: SurveyData
  onChange: (data: SurveyData) => void
}

export function VibrationCharacteristicsSection({ data, onChange }: VibrationCharacteristicsSectionProps) {
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

  const vibrationCauses = [
    "Pessoas caminhando/correndo no andar de cima",
    "Pessoas caminhando/correndo no meu próprio andar",
    "Pessoas pulando ou realizando atividades físicas",
    "Equipamentos (máquinas de lavar, aparelhos de ginástica, etc.)",
    "Tráfego de veículos pesados na rua próxima",
    "Vento forte",
    "Obras/construções nas proximidades",
    "Elevadores em funcionamento",
    "Não sei a causa",
  ]

  const accompaniedPhenomena = [
    "Ruído (rangidos, batidas)",
    "Movimento visível de objetos (quadros, lustres)",
    "Fissuras ou rachaduras em paredes/forros",
    "Dificuldade em manter o equilíbrio",
    "Não",
  ]

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Label className="text-amber-800 font-medium">
          Qual a principal causa que associa às vibrações?
          <span className="text-sm font-normal text-amber-600">(Pode marcar várias opções)</span>
        </Label>
        <div className="grid grid-cols-1 gap-3">
          {vibrationCauses.map((cause) => (
            <div key={cause} className="flex items-center space-x-2">
              <Checkbox
                id={cause}
                checked={(data.vibrationCauses || []).includes(cause)}
                onCheckedChange={(checked) => updateArrayData("vibrationCauses", cause, checked as boolean)}
                className="border-amber-300 data-[state=checked]:bg-amber-600"
              />
              <Label htmlFor={cause} className="text-sm text-amber-700 cursor-pointer">
                {cause}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <Label className="text-amber-800 font-medium">Como descreveria a intensidade das vibrações?</Label>
        <RadioGroup
          value={data.vibrationIntensity}
          onValueChange={(value) => updateData("vibrationIntensity", value)}
          className="space-y-2"
        >
          {[
            "Muito leve (apenas perceptível por pessoas muito sensíveis)",
            "Leve (claramente perceptível, mas não incômoda)",
            "Moderada (incômoda, mas tolerável)",
            "Forte (muito incômoda, causa preocupação)",
            "Muito forte (interfere nas atividades diárias, causa medo)",
          ].map((option) => (
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
          As vibrações são acompanhadas por algum outro fenômeno?
          <span className="text-sm font-normal text-amber-600">(Pode marcar várias opções)</span>
        </Label>
        <div className="grid grid-cols-1 gap-3">
          {accompaniedPhenomena.map((phenomenon) => (
            <div key={phenomenon} className="flex items-center space-x-2">
              <Checkbox
                id={phenomenon}
                checked={(data.accompaniedPhenomena || []).includes(phenomenon)}
                onCheckedChange={(checked) => updateArrayData("accompaniedPhenomena", phenomenon, checked as boolean)}
                className="border-amber-300 data-[state=checked]:bg-amber-600"
              />
              <Label htmlFor={phenomenon} className="text-sm text-amber-700 cursor-pointer">
                {phenomenon}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
