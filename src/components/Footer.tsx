import { GithubIcon, LinkedinIcon } from './Icons'

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="container-wide py-10 md:py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="text-center md:text-left">
            <p className="font-display text-base font-semibold text-text-primary">Ngô Võ Công Quyến</p>
            <p className="text-sm text-text-muted mt-1">Information Technology Student</p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/februus268"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-text-muted hover:text-accent transition-colors"
              aria-label="GitHub"
            >
              <GithubIcon size={17} />
            </a>
            <a
              href="https://linkedin.com/in/cong-quyen-nv-01b854429"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-text-muted hover:text-accent transition-colors"
              aria-label="LinkedIn"
            >
              <LinkedinIcon size={17} />
            </a>
            <span className="text-sm text-text-muted ml-2">© {new Date().getFullYear()}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
