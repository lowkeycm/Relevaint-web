import Home from '@/components/home';
import {inquiriesConfigured} from '@/lib/inquiries';
export const dynamic='force-dynamic';
export const metadata={alternates:{canonical:'/'}};
export default function Page(){return <Home inquiryEnabled={inquiriesConfigured()}/>;}
