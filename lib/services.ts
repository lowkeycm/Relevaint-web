export const capabilities = [
 {slug:'creative',label:'Ad creative',verb:'Get noticed.',benefit:'Give the right people a reason to stop, watch, and discover your business.',detail:'Videos, ads, and social content that make your offer easy to understand.',cta:'Explore creative',inquiry:'Video & ad creative'},
 {slug:'websites',label:'Website',verb:'Turn interest into action.',benefit:'Help visitors see your value, find what they need, and get in touch.',detail:'Websites and connected databases that bring customer information into your business.',cta:'Explore websites',inquiry:'Websites & landing pages'},
 {slug:'crm',label:'CRM',verb:'Know who needs what.',benefit:'Keep customer details, conversations, and next steps together so good inquiries don’t get lost.',detail:'Custom or off-the-shelf customer management, set up around your team.',cta:'Explore CRM setups',inquiry:'Sales tools & integrations'},
 {slug:'follow-up',label:'Follow-up',verb:'Keep the conversation going.',benefit:'Make it easier to respond, check in, and move a customer toward a decision.',detail:'Useful reminders and AI-assisted workflows, with your team in control.',cta:'Explore follow-up',inquiry:'Funnels & follow-up'},
 {slug:'connected-system',label:'Sale',verb:'Connect the whole path.',benefit:'Give your team the information and tools to help an interested person become a customer.',detail:'Creative, website, CRM, and follow-up working together. Start with one piece or all of them.',cta:'Explore the full system',inquiry:'Connected system'}
] as const;
export type ServiceSlug = typeof capabilities[number]['slug'];
export const serviceHref = (slug:string) => `/services/${slug}`;
export const inquiryHref = (slug:string) => `/?service=${slug}#contact`;
