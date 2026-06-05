module.exports = async (_req, res) => {
  res.status(200).json({
    ok: true,
    servis: "pc-doktoru-lisans",
    zaman: new Date().toISOString(),
    host: "vercel",
  });
};
