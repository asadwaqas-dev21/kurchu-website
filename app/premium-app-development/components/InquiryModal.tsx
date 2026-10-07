import { Arr } from "./ui";

/** Shell of the multi-step inquiry dialog — steps are rendered by interactions.ts. */
export function InquiryModal() {
  return (
    <div className="modal" id="inquiry" aria-hidden="true">
      <div className="modal-back" data-close=""></div>
      <div className="dialog" role="dialog" aria-modal="true" aria-labelledby="dlgTitle">
        <div className="dlg-head">
          <div className="dlg-prog">
            <div className="r">
              <span id="dlgTitle">Project inquiry</span>
              <span id="dlgStep">Step 1 of 7</span>
            </div>
            <div className="dlg-bar">
              <i id="dlgBar"></i>
            </div>
          </div>
          <button className="dlg-close" data-close="" aria-label="Close inquiry" type="button">
            <svg viewBox="0 0 14 14">
              <path d="M2 2l10 10M12 2 2 12" />
            </svg>
          </button>
        </div>
        <form className="dlg-body" id="inqForm" noValidate></form>
        <div className="dlg-foot" id="dlgFoot">
          <span className="hint">Press Enter ↵ to continue</span>
          <div className="acts">
            <button type="button" className="btn btn-ghost btn-sm" id="dlgBack" style={{ paddingRight: 18 }}>
              Back
            </button>
            <button type="button" className="btn btn-primary btn-sm" id="dlgNext">
              Continue <Arr />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
