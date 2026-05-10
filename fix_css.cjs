const fs = require('fs');
const content = fs.readFileSync('src/index.css', 'utf8');
const cleanContent = content.substring(0, content.indexOf('/* ─── Employer Accordion Fix ─── */')) + `/* ─── Employer Accordion Fix ─── */
.custom-employer-accordion .p-accordion-header-link {
  background-color: #F8FAFC !important;
  color: #0F172A !important;
  border-color: #f1f5f9 !important;
  border-radius: 16px !important;
  margin-bottom: 8px;
  box-shadow: none !important;
}

.custom-employer-accordion .p-accordion-content {
  background-color: transparent !important;
  border: none !important;
  padding: 0 !important;
}

.dark .custom-employer-accordion .p-accordion-header-link {
  background-color: #1F2937 !important;
  color: #ffffff !important;
  border-color: #374151 !important;
}

.custom-employer-accordion .p-accordion-header-text {
  flex: 1 1 auto;
  width: 100%;
  display: flex;
}
`;
fs.writeFileSync('src/index.css', cleanContent, 'utf8');
