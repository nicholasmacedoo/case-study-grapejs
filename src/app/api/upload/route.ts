import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import multer from 'multer'

const upload = multer({ dest: './public'}).single("files")
// export const config = {
//     api: {
//         bodyParser: false,
//     }
// }

export async function POST(req, res) {
    console.clear();
    console.log("LOGGING @ ::::", new Date().toString());

    upload(req, res, err => {
        if(err) {
            console.log(
                err instanceof multer.MulterError
                  ? "MULTER ERROR::::::"
                  : "OTHER ERROR::::::",
                err
              );
              return NextResponse.json({
                name: "Nextjs test post :: failed"
              });
        }
        return NextResponse.json({
            name: "Nextjs test post :: succeeded",
            payload: req.body
        });
    })
    // return NextResponse.json({ ok: true})
}

export async function GET(req: Request, res: Response) {
   
    return NextResponse.json({ ok: true});
}