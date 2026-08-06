import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const baseDir = "C:/Users/rahul/.gemini/antigravity-ide/brain/ca10d855-ea34-4713-83eb-301fd325d744";
    const destDir = path.join(process.cwd(), "public", "images");
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }

    const filesToCopy = [
      { src: "workflow_onboarding_3d_1785950697470.png", dest: "workflow-onboarding-3d.png" },
      { src: "fee_payment_engine_3d_1785950714584.png", dest: "fee-payment-engine-3d.png" },
      { src: "gps_telemetry_bus_3d_1785950732987.png", dest: "gps-telemetry-bus-3d.png" },
      { src: "report_card_engine_3d_1785950750935.png", dest: "report-card-engine-3d.png" }
    ];

    filesToCopy.forEach(item => {
      const srcPath = path.join(baseDir, item.src);
      const destPath = path.join(destDir, item.dest);
      if (fs.existsSync(srcPath)) {
        fs.copyFileSync(srcPath, destPath);
      }
    });

    return NextResponse.json({ success: true, copied: filesToCopy.length });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
