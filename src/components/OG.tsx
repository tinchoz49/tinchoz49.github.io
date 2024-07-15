export default function OG(
  title: string,
  image: { src: string, width: number | undefined, height: number | undefined }
) {
  return (
    <div
      style={{
        display: 'flex',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'column',
        backgroundImage: 'linear-gradient(to bottom, #dbf4ff, #fff1f1)',
        fontSize: 60,
        letterSpacing: -2,
        fontWeight: 700,
        textAlign: 'center',
      }}
    >
      <img
        src={image.src}
        width={image.width}
        height={image.height}
        style={{ maxWidth: '400px', maxHeight: '400px' }}
      />
      <div
        style={{
          backgroundImage: 'linear-gradient(90deg, rgb(79, 70, 229), rgb(0, 223, 216))',
          backgroundClip: 'text',
          color: 'transparent',
        }}
      >
        {title}
      </div>
    </div>
  )
}
