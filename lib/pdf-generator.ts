import type { SurveyData } from "@/app/page"

export function generatePDF(data: SurveyData) {
  // Create a new window with the survey data formatted for printing
  const printWindow = window.open("", "_blank")

  if (!printWindow) {
    alert("Por favor, permita pop-ups para descarregar o PDF")
    return
  }

  const currentDate = new Date().toLocaleDateString("pt-PT")

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Formulário de Percepção de Vibrações em Edifícios</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.4;
          margin: 20px;
          color: #333;
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
          border-bottom: 2px solid #D2691E;
          padding-bottom: 20px;
        }
        .header h1 {
          color: #8B4513;
          margin-bottom: 10px;
        }
        .section {
          margin-bottom: 25px;
          page-break-inside: avoid;
        }
        .section-title {
          background-color: #F4A460;
          color: white;
          padding: 8px 12px;
          font-weight: bold;
          margin-bottom: 15px;
        }
        .field {
          margin-bottom: 12px;
        }
        .field-label {
          font-weight: bold;
          color: #8B4513;
          margin-bottom: 5px;
        }
        .field-value {
          margin-left: 10px;
          padding: 5px;
          background-color: #FFF8DC;
          border-left: 3px solid #D2691E;
        }
        .privacy-notice {
          background-color: #FFF8DC;
          border: 1px solid #D2691E;
          padding: 15px;
          margin-bottom: 20px;
          font-size: 12px;
        }
        .footer {
          margin-top: 30px;
          text-align: center;
          font-size: 12px;
          color: #666;
          border-top: 1px solid #D2691E;
          padding-top: 15px;
        }
        @media print {
          body { margin: 0; }
          .no-print { display: none; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Formulário de Percepção de Vibrações em Edifícios</h1>
        <h2>Investigação sobre a Percepção de Vibrações em Edifícios Residenciais</h2>
        <p><strong>Data de preenchimento:</strong> ${currentDate}</p>
      </div>

      <div class="privacy-notice">
        <h3>Declaração de Privacidade e Consentimento</h3>
        <p>Os dados coletados neste formulário serão utilizados exclusivamente para fins acadêmicos relacionados a esta monografia. Todas as respostas serão tratadas com total confidencialidade e os dados pessoais não serão divulgados individualmente.</p>
      </div>

      <div class="section">
        <div class="section-title">Seção 1: Dados Pessoais e Demográficos</div>
        <div class="field">
          <div class="field-label">Nome Completo:</div>
          <div class="field-value">${data.fullName || "Não informado"}</div>
        </div>
        <div class="field">
          <div class="field-label">Idade:</div>
          <div class="field-value">${data.age || "Não informado"}</div>
        </div>
        <div class="field">
          <div class="field-label">Sexo:</div>
          <div class="field-value">${data.gender || "Não informado"}</div>
        </div>
        <div class="field">
          <div class="field-label">Estado Civil:</div>
          <div class="field-value">${data.maritalStatus || "Não informado"}</div>
        </div>
        <div class="field">
          <div class="field-label">Profissão:</div>
          <div class="field-value">${data.profession || "Não informado"}</div>
        </div>
        <div class="field">
          <div class="field-label">Tempo de residência no edifício:</div>
          <div class="field-value">${data.residenceTime || "Não informado"}</div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">Seção 2: Dados do Edifício e Apartamento</div>
        <div class="field">
          <div class="field-label">Nome do Edifício:</div>
          <div class="field-value">${data.buildingName || "Não informado"}</div>
        </div>
        <div class="field">
          <div class="field-label">Número do Andar:</div>
          <div class="field-value">${data.floorNumber || "Não informado"}</div>
        </div>
        <div class="field">
          <div class="field-label">Localização do Apartamento:</div>
          <div class="field-value">${data.apartmentLocation || "Não informado"}</div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">Seção 3: Percepção Geral das Vibrações</div>
        <div class="field">
          <div class="field-label">Percebeu vibrações incomuns:</div>
          <div class="field-value">${data.hasPerceivedVibrations || "Não informado"}</div>
        </div>
        <div class="field">
          <div class="field-label">Frequência das vibrações:</div>
          <div class="field-value">${data.vibrationFrequency || "Não informado"}</div>
        </div>
        <div class="field">
          <div class="field-label">Locais onde percebe as vibrações:</div>
          <div class="field-value">${data.vibrationLocations?.join(", ") || "Não informado"}</div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">Seção 4: Características das Vibrações</div>
        <div class="field">
          <div class="field-label">Principais causas associadas:</div>
          <div class="field-value">${data.vibrationCauses?.join(", ") || "Não informado"}</div>
        </div>
        <div class="field">
          <div class="field-label">Intensidade das vibrações:</div>
          <div class="field-value">${data.vibrationIntensity || "Não informado"}</div>
        </div>
        <div class="field">
          <div class="field-label">Fenômenos acompanhantes:</div>
          <div class="field-value">${data.accompaniedPhenomena?.join(", ") || "Não informado"}</div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">Seção 5: Impacto das Vibrações na Qualidade de Vida</div>
        <div class="field">
          <div class="field-label">Impacto no conforto:</div>
          <div class="field-value">${data.comfortImpact || "Não informado"}</div>
        </div>
        <div class="field">
          <div class="field-label">Preocupações com segurança:</div>
          <div class="field-value">${data.safetyWorries || "Não informado"}</div>
        </div>
        <div class="field">
          <div class="field-label">Áreas evitadas:</div>
          <div class="field-value">${data.avoidedAreas || "Não informado"}</div>
        </div>
        <div class="field">
          <div class="field-label">Problema reportado:</div>
          <div class="field-value">${data.reportedProblem || "Não informado"}</div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">Seção 6: Comentários Adicionais</div>
        <div class="field">
          <div class="field-label">Observações:</div>
          <div class="field-value">${data.additionalComments || "Nenhum comentário adicional"}</div>
        </div>
      </div>

      <div class="footer">
        <p>Estudo de licenciatura em Engenharia Civil - Análise de vibrações em edifícios residenciais</p>
        <p>Documento gerado automaticamente em ${currentDate}</p>
      </div>

      <script>
        window.onload = function() {
          window.print();
          window.onafterprint = function() {
            window.close();
          }
        }
      </script>
    </body>
    </html>
  `

  printWindow.document.write(htmlContent)
  printWindow.document.close()
}
