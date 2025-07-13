import Image from 'next/image';

export default function About() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center py-32 bg-gray-100 dark:bg-gray-700 ">
        <div className="w-full max-w-4xl p-8 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/3 flex justify-center items-center mb-8 md:mb-0 ">
              <div className="relative w-48 h-48 rounded-full overflow-hidden">
                <Image src="/logo.jpg" alt="Profile" layout="fill" objectFit="cover" className="rounded-full" />
              </div>
            </div>
            <div className="w-full md:w-2/3 flex flex-col justify-center ">
              <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">About Me</h1>
              <p className="text-gray-600 dark:text-gray-50 text-lg mb-4">
                Hello! I&apos;m Sarthak Agrawal, a passionate web developer and student. I created this website to help Class 11 Commerce students with free, easy-to-understand notes for every chapter. My goal is to make learning simpler and more accessible for everyone.
              </p>
              <p className="text-gray-600 dark:text-gray-50 text-lg">
                Whether you&apos;re just starting out or looking to sharpen your skills, you&apos;ll find a variety of resources and insights here. Let&apos;s explore the world of programming together!
              </p>
            </div>
          </div>
        </div>
      </div>

      <section className="py-16 bg-gray-50 dark:bg-gray-800 dark:text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Sarthak&apos;s Journey as a Creator</h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-50">
              From a student with a vision to a helpful resource builder, here&apos;s how Sarthak created a platform for learners.
            </p>
          </div>
          <div className="space-y-12">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/3">
                <Image src="/3.png" alt="Sarthak getting the idea" width={500} height={500} className="w-full rounded-lg shadow-lg" />
              </div>
              <div className="md:w-2/3 md:pl-8 mt-8 md:mt-0">
                <div className='mb-8'>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white">The Idea Takes Root</h3>
                  <p className="mt-4 text-gray-600 dark:text-gray-50">
                    Sarthak&rsquo;s journey began during his own Class 11 studies when he struggled to find well-organized notes online. Inspired to help others, he decided to build a website that would provide clear, reliable, and accessible notes for commerce students.
                  </p>
                </div>
                <br /><br />
                <div className='mt-8'>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white">From Notes to Code</h3>
                  <p className="mt-4 text-gray-600 dark:text-gray-50">
                    Alongside studying commerce, Sarthak learned web development tools like HTML, CSS, and React. He started building the platform step by step—adding chapters, organizing content, and making the website user-friendly for fellow students.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row-reverse items-center">
              <div className="md:w-1/3">
                <Image src="/1.png" alt="Sarthak learning to code" width={500} height={500} className="w-full rounded-lg shadow-lg" />
              </div>
              <div className="md:w-2/3 md:pr-8 mt-8 md:mt-0">
                <div className='mb-8'>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white">From Notes to Code</h3>
                  <p className="mt-4 text-gray-600 dark:text-gray-50">
                    Alongside studying commerce, Sarthak learned web development tools like HTML, CSS, and React. He started building the platform step by step—adding chapters, organizing content, and making the website user-friendly for fellow students.
                  </p>
                </div>
                <br /><br />
                <div className='mt-8'>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Building with Purpose</h3>
                  <p className="mt-4 text-gray-600 dark:text-gray-50">
                    Sarthak faced challenges like organizing large content, designing responsive layouts, and writing clean code. But with each hurdle, he learned and improved. His goal remained clear—make studying easier for every Class 11 Commerce student.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
}
