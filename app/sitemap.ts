import type {MetadataRoute} from 'next';
import {capabilities} from '@/lib/services';
import {siteUrl} from '@/lib/site-url';
export default function sitemap():MetadataRoute.Sitemap{return [{url:siteUrl,changeFrequency:'monthly',priority:1},...capabilities.map(s=>({url:`${siteUrl}/services/${s.slug}`,changeFrequency:'monthly' as const,priority:0.8}))];}
