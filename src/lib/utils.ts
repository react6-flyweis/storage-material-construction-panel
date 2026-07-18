import toast from "react-hot-toast";

export interface QRModalData {
  projectName?: string;
  shipperRef?: string;
  loadId?: string;
  id?: string;
  parts?: string;
  weight?: number | string;
  length?: number | string;
  bundleId?: string;
}

export const getQRCodeUrl = (data: string | object, size = "250x250") => {
  const dataStr = typeof data === "string" ? data : JSON.stringify(data);
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}&data=${encodeURIComponent(dataStr)}`;
};

export const formatValue = (val: string | number | null | undefined) => {
  if (val === undefined || val === null) return "";
  return String(val);
};

export const printQRCodeLabel = (data: QRModalData) => {
  const qrDataObj = {
    project: (data.projectName || "").replace(/\s+/g, ""),
    shipper: data.shipperRef || "SHP-1044",
    load_id: data.loadId || "LOAD-001",
    bundle_id: data.id || "BND-001",
    parts: (data.parts || "").replace(/\s+/g, ""),
    weight: formatValue(data.weight),
    length: formatValue(data.length),
  };
  const standaloneBase = import.meta.env.VITE_STANDLONE_PAGE_BASE || "";
  const qrCodeUrl = data.bundleId
    ? getQRCodeUrl(`${standaloneBase.replace(/\/+$/, "")}/bundle/${data.bundleId}`, "250x250")
    : getQRCodeUrl(qrDataObj, "250x250");

  const printWindow = window.open("", "_blank");
  if (!printWindow) {
    toast.error("Popup blocker prevented printing. Please allow popups for this site.");
    return;
  }

  printWindow.document.write(`
    <html>
      <head>
        <title>Print QR Code Label - ${data.id || ""}</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
          body {
            font-family: 'Inter', sans-serif;
            margin: 0;
            padding: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background-color: #fff;
          }
          .label-container {
            border: 2px solid #000;
            border-radius: 12px;
            padding: 20px;
            width: 400px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .title {
            font-size: 24px;
            font-weight: 700;
            margin-bottom: 15px;
            color: #212B36;
          }
          .qr-code {
            width: 200px;
            height: 200px;
            margin-bottom: 20px;
          }
          .data-list {
            width: 100%;
            font-size: 14px;
            color: #212B36;
          }
          .data-row {
            display: flex;
            margin-bottom: 6px;
          }
          .data-label {
            font-weight: 600;
            width: 120px;
            color: #637381;
          }
          .data-value {
            font-weight: 500;
            flex: 1;
          }
          @media print {
            body {
              padding: 0;
              background-color: #fff;
              height: auto;
            }
            .label-container {
              border: none;
              box-shadow: none;
              padding: 0;
              margin: 0;
              width: 100%;
            }
          }
        </style>
      </head>
      <body>
        <div class="label-container">
          <div class="title">QR Code Label</div>
          <img class="qr-code" src="${qrCodeUrl}" alt="QR Code" />
          <div class="data-list">
            <div class="data-row">
              <span class="data-label">Project:</span>
              <span class="data-value">project=${qrDataObj.project}</span>
            </div>
            <div class="data-row">
              <span class="data-label">Shipper:</span>
              <span class="data-value">shipper=${qrDataObj.shipper}</span>
            </div>
            <div class="data-row">
              <span class="data-label">Load ID:</span>
              <span class="data-value">load_id=${qrDataObj.load_id}</span>
            </div>
            <div class="data-row">
              <span class="data-label">Bundle ID:</span>
              <span class="data-value">bundle_id=${qrDataObj.bundle_id}</span>
            </div>
            <div class="data-row">
              <span class="data-label">Parts:</span>
              <span class="data-value">parts=${qrDataObj.parts}</span>
            </div>
            <div class="data-row">
              <span class="data-label">Weight:</span>
              <span class="data-value">weight=${qrDataObj.weight}</span>
            </div>
            <div class="data-row">
              <span class="data-label">Length:</span>
              <span class="data-value">Length=${qrDataObj.length}</span>
            </div>
          </div>
        </div>
        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
              window.close();
            }, 500);
          };
        </script>
      </body>
    </html>
  `);
  printWindow.document.close();
};
