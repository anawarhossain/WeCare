import { MdLocationOn, MdMail, MdCall, MdPublic, MdShare, MdVideocam } from "react-icons/md";

export default function HomeFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="pt-20 pb-10 text-white" style={{ backgroundColor: "var(--sidebar-bg)" }}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="space-y-6">
          <div className="text-xl font-bold">WeCare</div>
          <p className="text-white/70 text-sm">
            Empowering patients through technology and clinical excellence. We are dedicated to
            making quality healthcare accessible to everyone.
          </p>
          <div className="flex gap-4">
            {[MdPublic, MdShare, MdVideocam].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all"
              >
                <Icon className="text-lg" />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-bold text-lg mb-6">Quick Links</h4>
          <ul className="space-y-4 text-white/70 text-sm">
            <li><a href="/doctors" className="hover:text-white transition-colors">Find a Doctor</a></li>
            <li><a href="/specializations" className="hover:text-white transition-colors">Specializations</a></li>
            <li><a href="/about" className="hover:text-white transition-colors">About Our Team</a></li>
            <li><a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
            <li><a href="/terms" className="hover:text-white transition-colors">Terms of Service</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-bold text-lg mb-6">Contact Info</h4>
          <ul className="space-y-4 text-white/70 text-sm">
            <li className="flex items-start gap-3">
              <MdLocationOn style={{ color: "var(--secondary-fixed)" }} />
              123 Healthcare Plaza, Medical District, NY 10001
            </li>
            <li className="flex items-center gap-3">
              <MdMail style={{ color: "var(--secondary-fixed)" }} />
              support@wecare.com
            </li>
            <li className="flex items-center gap-3">
              <MdCall style={{ color: "var(--secondary-fixed)" }} />
              +1 (555) 123-4567
            </li>
          </ul>
        </div>

        {/* Emergency */}
        <div>
          <h4 className="font-bold text-lg mb-6">Emergency</h4>
          <div className="bg-white/10 p-6 rounded-xl border border-white/20">
            <p className="text-sm text-white/80 mb-2">24/7 Emergency Hotline</p>
            <p className="text-2xl font-bold" style={{ color: "var(--secondary-fixed)" }}>
              1-800-WE-CARE
            </p>
            <a
              href="tel:1-800-932-2731"
              className="w-full mt-4 block text-center py-2 rounded-lg font-bold transition-all hover:opacity-90"
              style={{ backgroundColor: "var(--color-danger)", color: "#ffffff" }}
            >
              Call Now
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-16 pt-8 border-t border-white/10 text-center text-white/50 text-sm">
        © {year} WeCare Healthcare. All rights reserved.
      </div>
    </footer>
  );
}
