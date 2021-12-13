import { ClipboardListIcon, GiftIcon, UserGroupIcon, SupportIcon } from '@heroicons/react/outline'

const features = [
  {
    name: 'Earn points',
    description:
      'For every successful engagement, you will be granted a set of points reflecting your contribution. Explore the main features of your points in your dashboard.',
    icon: GiftIcon,
  },
  {
    name: 'Help people',
    description:
      'Two is always stronger then one, and many people in your community need your help. Join us in this quest and help someone today.',
    icon: SupportIcon,
  },
  {
    name: 'Create a community',
    description:
      'Through helping people you will discover new experiences and new cultures. Making a friend or two is always a wonderful gift. Our website is amied to do just that.',
    icon: UserGroupIcon,
  },
  {
    name: 'Climb the leaderboard',
    description:
      'Competition between your community members, to figure out who is the wothy of the name of "Superhero" in your community. Check the realtime updates!',
    icon: ClipboardListIcon,
  },
]

export default function Features() {
  return (
    <div className="pb-12 mt-20 bg-white container mx-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-blueish6 font-semibold tracking-wide uppercase">Key Features</h2>
          <p className="mt-2 text-5xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Everyone can become a superhero
          </p>
          <p className="mt-4 max-w-2xl text-2xl text-gray-500 lg:mx-auto">
            Everything you need to to connect with people in your community and create bonds.
          </p>
        </div>

        <div className="mt-20">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {features.map((feature) => (
              <div key={feature.name} className="relative mb-5">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-greenish5 text-white">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-2xl leading-6 font-medium text-gray-900">{feature.name}</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-xl text-gray-500">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}