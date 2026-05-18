import { Github, Linkedin, Mail, Heart } from 'lucide-react'

const socials = [
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:harsh@example.com', label: 'Email' },
]

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid rgba(0,0,0,0.05)' }}>
      <div className="max-w-5xl mx-auto px-6 py-14">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <span className="font-heading font-semibold text-[15px]" style={{ color: '#111111' }}>Harsh</span>
            <p className="text-[12px] mt-1 max-w-[260px]" style={{ color: '#8b8b93' }}>
              Crafting premium digital experiences with modern web technologies.
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            {socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" title={s.label}
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 hover:bg-black/[0.04]"
                style={{ color: '#8b8b93', border: '1px solid rgba(0,0,0,0.05)' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#3f3f46' }}
                onMouseLeave={(e) => { e.currentTarget.style.color = '#a1a1aa' }}>
                <s.icon size={14} />
              </a>
            ))}
          </div>
          <div className="text-center md:text-right">
            <p className="text-[10px] flex items-center gap-1 justify-center md:justify-end" style={{ color: '#d4d4d8' }}>
              Built with <Heart size={9} style={{ color: '#b4a58c' }} /> React + TailwindCSS
            </p>
            <p className="text-[10px] mt-1" style={{ color: '#d4d4d8' }}>© {new Date().getFullYear()} Harsh Pal</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
