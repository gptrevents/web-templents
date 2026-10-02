import React from 'react';
import { ArrowUp } from 'lucide-react';

interface KmFooterProps {
  groomName?: string;
  brideName?: string;
}

export const KmFooter: React.FC<KmFooterProps> = ({
  groomName = 'Rahul',
  brideName = 'Harinya',
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="km-footer">
      <div className="km-footer__card">
        <img
          className="km-footer__art"
          src="/assets/kalyana-mandapam/footer-card.jpg"
          alt=""
          aria-hidden="true"
          loading="lazy"
        />

        <div className="km-footer__greeting">
          <p className="km-footer__greet-lead km-font-serif">
            We await your gracious presence
          </p>
          <p className="km-footer__greet-main km-font-script">
            and your blessings
          </p>
          <p className="km-footer__greet-mark km-font-serif">
            శుభమస్తు • Mangalam
          </p>
        </div>

        <div className="km-footer__credit">
          <span className="km-footer__credit-lead">
            Cordially invited by the families of
          </span>
          <span className="km-footer__credit-brand">
            {brideName} &amp; {groomName}
          </span>
          <button
            type="button"
            onClick={scrollToTop}
            className="km-footer__credit-cta inline-flex items-center gap-1.5 cursor-pointer mt-2"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
