import axios from 'axios'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import Marquee from "react-fast-marquee"

export default function Home() {
  const [nip, setNip] = useState("")
  const [tipe, setTipe] = useState("in")
  const locale = 'in';
  const [today, setTime] = useState(new Date())
  const [clock, setClock] = useState()

  useEffect(() => {
    const timer = setInterval(() => {
      const xdate = new Date();
      setClock(xdate.toLocaleTimeString('in'))
      // console.log("oke")
    }, 1000);
  }, []);

  const day = today.toLocaleDateString(locale, { weekday: 'long' });
  const date = `${day}, ${today.getDate()} ${today.toLocaleDateString(locale, { month: 'long' })}\n\n`;

  const handlerAbsen = async (e) => {
    e.preventDefault();
    if (nip === "") {
      return Swal.fire("Error", "Harap Isi NIP", "error")
    }
    const data = {
      jenis: tipe,
      nip: nip
    }
    await axios.post("http://127.0.0.1:8000/api/absen/storeAbsen", data).then((res) => {
      Swal.fire({
        title: 'Absen Berhasil',
        text: '420198010 Riski Apriliansyah',
        imageUrl: '../assets/pegawai/riski.jpg',
        imageWidth: 150,
        imageHeight: 200,
        imageAlt: 'Image',
        timer: 1500
      })
    }).catch((err) => {
      console.log(err)
      if (err.response.status == 402) {
        Swal.fire("Gagal", err.response.data.message, "error")
      }
    })
    setNip("")
  }

  return (
    <div>
      <Head>
        <title>DPMPTSP</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="navbar bg-base-100 fixed top-0 opacity-75">
        <Marquee>
          {/* <a className="btn btn-ghost normal-case text-xl">Dinas Penanaman Modal dan Pelayanan Terpadu Satu Pintu</a> */}
          <img src="../assets/logo.png" alt="" className='h-12' />
          <span className='ml-2'>{date}</span>
        </Marquee>
      </div>
      <div className="hero min-h-screen hero">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className='px-6 py-2 text-2xl'>{date} {clock}</div>
            <div className="card-body">
              <form onSubmit={() => handlerAbsen}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">NIP (Nomor Induk Pegawai)</span>
                  </label>
                  <input type="text" placeholder="" className="input input-bordered" value={nip} onChange={(e) => setNip(e.target.value)} />
                  <div className="flex gap-2 text-sm mt-2">
                    <input type="radio" id="masuk" name="radio-1" value={"in"} className="radio" checked={tipe === "in" ? true : false} onChange={(e) => setTipe(e.target.value)} /> <label htmlFor="masuk">Masuk</label>
                    <input type="radio" id="keluar" name="radio-1" value={"out"} className="radio" checked={tipe === "out" ? true : false} onChange={(e) => setTipe(e.target.value)} /> <label htmlFor="keluar">Keluar</label>
                  </div>
                </div>
                <div className="form-control mt-6">
                  <button type='submit' className="btn btn-primary" onClick={handlerAbsen}>absen</button>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
