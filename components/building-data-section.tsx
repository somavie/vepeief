"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import type { SurveyData } from "@/app/page"

interface BuildingDataSectionProps {
  data: SurveyData
  onChange: (data: SurveyData) => void
}

export function BuildingDataSection({ data, onChange }: BuildingDataSectionProps) {
  const updateData = (field: keyof SurveyData, value: string) => {
    onChange({ ...data, [field]: value })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="buildingName" className="text-amber-800 font-medium">
          Nome do Edifício
        </Label>
        <Input
          id="buildingName"
          value={data.buildingName}
          onChange={(e) => updateData("buildingName", e.target.value)}
          placeholder="Ex: Edifício Coqueiros I"
          className="border-amber-200 focus:border-amber-400"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="floorNumber" className="text-amber-800 font-medium">
          Número do Andar do seu Apartamento
        </Label>
        <Input
          id="floorNumber"
          value={data.floorNumber}
          onChange={(e) => updateData("floorNumber", e.target.value)}
          placeholder="Ex: 5"
          type="number"
          className="border-amber-200 focus:border-amber-400"
        />
      </div>

      <div className="space-y-3">
        <Label className="text-amber-800 font-medium">Localização do seu Apartamento no Andar</Label>
        <RadioGroup
          value={data.apartmentLocation}
          onValueChange={(value) => updateData("apartmentLocation", value)}
          className="grid grid-cols-2 gap-2"
        >
          {["Frente", "Fundos", "Lateral Esquerda", "Lateral Direita", "Centro", "Não sei especificar"].map(
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
    </div>
  )
}
