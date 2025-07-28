"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { PersonalDataSection } from "@/components/personal-data-section"
import { BuildingDataSection } from "@/components/building-data-section"
import { VibrationPerceptionSection } from "@/components/vibration-perception-section"
import { VibrationCharacteristicsSection } from "@/components/vibration-characteristics-section"
import { QualityOfLifeSection } from "@/components/quality-of-life-section"
import { AdditionalCommentsSection } from "@/components/additional-comments-section"
import { generatePDF } from "@/lib/pdf-generator"
import { CheckCircle, FileText, Home } from "lucide-react"

export interface SurveyData {
  // Seção 1: Dados Pessoais
  fullName: string
  age: string
  gender: string
  maritalStatus: string
  profession: string
  residenceTime: string

  // Seção 2: Dados do Edifício
  buildingName: string
  floorNumber: string
  apartmentLocation: string

  // Seção 3: Percepção Geral
  hasPerceivedVibrations: string
  vibrationFrequency: string
  vibrationLocations: string[]

  // Seção 4: Características das Vibrações
  vibrationCauses: string[]
  vibrationIntensity: string
  accompaniedPhenomena: string[]

  // Seção 5: Impacto na Qualidade de Vida
  comfortImpact: string
  safetyWorries: string
  avoidedAreas: string
  reportedProblem: string

  // Seção 6: Comentários
  additionalComments: string
}

const initialData: SurveyData = {
  fullName: "",
  age: "",
  gender: "",
  maritalStatus: "",
  profession: "",
  residenceTime: "",
  buildingName: "",
  floorNumber: "",
  apartmentLocation: "",
  hasPerceivedVibrations: "",
  vibrationFrequency: "",
  vibrationLocations: [],
  vibrationCauses: [],
  vibrationIntensity: "",
  accompaniedPhenomena: [],
  comfortImpact: "",
  safetyWorries: "",
  avoidedAreas: "",
  reportedProblem: "",
  additionalComments: "",
}

export default function VibrationSurvey() {
  const [currentSection, setCurrentSection] = useState(0)
  const [surveyData, setSurveyData] = useState<SurveyData>(initialData)
  const [isCompleted, setIsCompleted] = useState(false)

  const sections = [
    { title: "Dados Pessoais", component: PersonalDataSection },
    { title: "Dados do Edifício", component: BuildingDataSection },
    { title: "Percepção de Vibrações", component: VibrationPerceptionSection },
    { title: "Características", component: VibrationCharacteristicsSection },
    { title: "Qualidade de Vida", component: QualityOfLifeSection },
    { title: "Comentários", component: AdditionalCommentsSection },
  ]

  const progress = ((currentSection + 1) / sections.length) * 100

  const handleNext = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1)
    } else {
      setIsCompleted(true)
    }
  }

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1)
    }
  }

  const handleGeneratePDF = () => {
    generatePDF(surveyData)
  }

  const handleRestart = () => {
    setSurveyData(initialData)
    setCurrentSection(0)
    setIsCompleted(false)
  }

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-4">
        <div className="max-w-2xl mx-auto pt-8">
          <Card className="border-amber-200 shadow-lg">
            <CardHeader className="text-center bg-gradient-to-r from-amber-100 to-orange-100 rounded-t-lg">
              <div className="flex justify-center mb-4">
                <CheckCircle className="h-16 w-16 text-amber-600" />
              </div>
              <CardTitle className="text-2xl text-amber-800">Inquérito Concluído!</CardTitle>
              <CardDescription className="text-amber-700">
                Obrigado pela sua participação. Os seus dados foram registados com sucesso.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <p className="text-center text-amber-700">
                Pode agora descarregar o PDF com as suas respostas ou iniciar um novo inquérito.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button onClick={handleGeneratePDF} className="bg-amber-600 hover:bg-amber-700 text-white">
                  <FileText className="mr-2 h-4 w-4" />
                  Descarregar PDF
                </Button>
                <Button
                  onClick={handleRestart}
                  variant="outline"
                  className="border-amber-300 text-amber-700 hover:bg-amber-50 bg-transparent"
                >
                  Novo Inquérito
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const CurrentSectionComponent = sections[currentSection].component

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <div className="flex justify-center mb-4">
            <Home className="h-12 w-12 text-amber-600" />
          </div>
          <h1 className="text-3xl font-bold text-amber-800 mb-2">Investigação sobre Percepção de Vibrações</h1>
          <p className="text-amber-700 max-w-2xl mx-auto">
            Estudo de licenciatura em Engenharia Civil focado na análise de vibrações em edifícios residenciais
          </p>
        </div>

        {/* Progress Bar */}
        <Card className="mb-6 border-amber-200">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-amber-700">
                Seção {currentSection + 1} de {sections.length}: {sections[currentSection].title}
              </span>
              <span className="text-sm text-amber-600">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2 bg-amber-100" />
          </CardContent>
        </Card>

        {/* Privacy Notice */}
        {currentSection === 0 && (
          <Card className="mb-6 border-amber-200 bg-amber-50">
            <CardHeader>
              <CardTitle className="text-lg text-amber-800">Declaração de Privacidade e Consentimento</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-amber-700 space-y-2">
              <p>
                Informamos que os dados coletados neste formulário serão utilizados exclusivamente para fins acadêmicos
                relacionados a esta monografia.
              </p>
              <p>
                Todas as suas respostas serão tratadas com total confidencialidade e os dados pessoais não serão
                divulgados individualmente.
              </p>
              <p className="font-medium">
                Ao preencher este formulário, você concorda com a utilização dos seus dados para os fins descritos.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Current Section */}
        <Card className="border-amber-200 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-amber-100 to-orange-100">
            <CardTitle className="text-xl text-amber-800">{sections[currentSection].title}</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <CurrentSectionComponent data={surveyData} onChange={setSurveyData} />
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between mt-6 pb-8">
          <Button
            onClick={handlePrevious}
            disabled={currentSection === 0}
            variant="outline"
            className="border-amber-300 text-amber-700 hover:bg-amber-50 disabled:opacity-50 bg-transparent"
          >
            Anterior
          </Button>
          <Button onClick={handleNext} className="bg-amber-600 hover:bg-amber-700 text-white">
            {currentSection === sections.length - 1 ? "Concluir" : "Próximo"}
          </Button>
        </div>
      </div>
    </div>
  )
}
