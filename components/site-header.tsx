'use client';

import {useState} from 'react';
import {ArrowUpRight, Menu, ChevronDown, X} from 'lucide-react';
import {Dialog, DialogClose, DialogContent, DialogTitle, DialogDescription, DialogTrigger} from '@/components/ui/dialog';
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from '@/components/ui/dropdown-menu';
import {capabilities, serviceHref} from '@/lib/services';

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  return <Dialog open={open} onOpenChange={setOpen}>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header">
      <a href="/" aria-label="Relevaint home"><img className="brand-logo" src="/media/relevaint-logo.png" alt="Relevaint" width="132" height="46"/></a>
      <nav aria-label="Main navigation">
        <DropdownMenu>
          <DropdownMenuTrigger className="services-menu-trigger">Services <ChevronDown size={14}/></DropdownMenuTrigger>
          <DropdownMenuContent align="start">{capabilities.map(s => <DropdownMenuItem key={s.slug} asChild><a href={serviceHref(s.slug)}>{s.navLabel}</a></DropdownMenuItem>)}</DropdownMenuContent>
        </DropdownMenu>
        <a href="/#work">Work</a><a href="/services/connected-system">The full system</a><a href="/#about">About</a>
        <a className="nav-cta" href="/#contact">Let’s talk <ArrowUpRight size={16}/></a>
      </nav>
      <DialogTrigger asChild><button type="button" className="mobile-menu" aria-label="Open menu"><Menu size={22}/></button></DialogTrigger>
    </header>
    <DialogContent className="mobile-nav-dialog translate-y-0" showCloseButton={false}>
      <div className="mobile-nav-heading">
        <div><DialogTitle>How can we help your business?</DialogTitle><DialogDescription>One service or a connected system.</DialogDescription></div>
        <DialogClose asChild><button type="button" className="mobile-nav-close" aria-label="Close menu"><X size={22}/></button></DialogClose>
      </div>
      <nav className="mobile-nav-links" aria-label="Mobile navigation">
        {capabilities.map(s => <DialogClose asChild key={s.slug}><a href={serviceHref(s.slug)}>{s.navLabel}<ArrowUpRight size={18}/></a></DialogClose>)}
        <DialogClose asChild><a href="/#work">See the work</a></DialogClose>
        <DialogClose asChild><a href="/#contact">Let’s talk</a></DialogClose>
      </nav>
    </DialogContent>
  </Dialog>;
}
