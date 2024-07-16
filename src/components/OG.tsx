interface Options {
  title: string
  description: string
  image: string
}

export default function OG(options: Options) {
  const { title, description, image } = options

  return (
    <div tw="flex size-full flex-col items-center justify-center bg-white">
      <div tw="flex w-full bg-gray-50" style={{ width: 1200, height: 630 }}>
        <div tw="flex w-full justify-center p-8 px-4 py-12 md:items-center">
          <h2 tw="flex-2 flex flex-col text-left text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl leading-normal">
            <span>{title}</span>
            <span tw="text-indigo-600">{description}</span>
          </h2>
          <div tw="ml-8 mt-0 flex flex-1">
            <img
              src={image}
              style={{ maxWidth: '400px', maxHeight: '400px' }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
