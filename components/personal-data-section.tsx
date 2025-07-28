"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import type { SurveyData } from "@/app/page"

interface PersonalDataSectionProps {
  data: SurveyData
  onChange: (data: SurveyData) => void
}

export function PersonalDataSection({ data, onChange }: PersonalDataSectionProps) {
  const updateData = (field: keyof SurveyData, value: string) => {
    onChange({ ...data, [field]: value })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="fullName" className="text-amber-800 font-medium">
          Nome Completo (Opcional)
        </Label>
        <Input
          id="fullName"
          value={data.fullName}
          onChange={(e) => updateData("fullName", e.target.value)}
          placeholder="Digite seu nome completo"
          className="border-amber-200 focus:border-amber-400"
        />
        <p className="text-xs text-amber-600">
          A identificação ajuda na validação de dados para possíveis medições futuras
        </p>
      </div>

      <div className="space-y-3">
        <Label className="text-amber-800 font-medium">Idade</Label>
        <RadioGroup
          value={data.age}
          onValueChange={(value) => updateData("age", value)}
          className="grid grid-cols-2 gap-2"
        >
          {["Abaixo de 25 anos", "25 - 34 anos", "35 - 44 anos", "45 - 54 anos", "55 - 64 anos", "65 anos ou mais"].map(
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
        <Label className="text-amber-800 font-medium">Sexo</Label>
        <RadioGroup
          value={data.gender}
          onValueChange={(value) => updateData("gender", value)}
          className="flex flex-wrap gap-4"
        >
          {["Feminino", "Masculino", "Prefiro não informar"].map((option) => (
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
        <Label className="text-amber-800 font-medium">Estado Civil</Label>
        <RadioGroup
          value={data.maritalStatus}
          onValueChange={(value) => updateData("maritalStatus", value)}
          className="grid grid-cols-2 gap-2"
        >
          {["Solteiro(a)", "Casado(a) / União Estável", "Divorciado(a) / Separado(a)", "Viúvo(a)"].map((option) => (
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
        <Label htmlFor="profession" className="text-amber-800 font-medium">
          Profissão
        </Label>
        <Input
          id="profession"
          value={data.profession}
          onChange={(e) => updateData("profession", e.target.value)}
          placeholder="Digite sua profissão"
          className="border-amber-200 focus:border-amber-400"
        />
      </div>

      <div className="space-y-3">
        <Label className="text-amber-800 font-medium">Há quanto tempo reside neste edifício?</Label>
        <RadioGroup
          value={data.residenceTime}
          onValueChange={(value) => updateData("residenceTime", value)}
          className="grid grid-cols-2 gap-2"
        >
          {["Menos de 1 ano", "1 - 3 anos", "4 - 6 anos", "Mais de 6 anos"].map((option) => (
            <div key={option} className="flex items-center space-x-2">
              <RadioGroupItem value={option} id={option} className="text-amber-600" />
              <Label htmlFor={option} className="text-sm text-amber-700 cursor-pointer">
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  )
}
