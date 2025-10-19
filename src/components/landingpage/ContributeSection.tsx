import { Github, Link } from "lucide-react";
import Image from "next/image";
import LiberaPayLogo from "@/assets/icons/liberaPayLogo.svg";

const ContributeSection = () => {
    return (
        <section className="pt-40 w-full">
            <div className="content-wrapper  flex flex-col items-center space-y-4">
                <h2 className="text-4xl font-bold mb-8">Contribute</h2>

                <div className="grid grid-cols-2 w-full gap-8">
                    <div className="wrapper p-8 col-span-2 md:col-span-1">
                        <h3 className="text-2xl font-bold">
                            Code contributions
                        </h3>
                        <p className="mt-2">
                            Socialfolio is an open-source project made for and
                            by the community. Our goal is to build a beautiful
                            way to showcase your social presence across the
                            Fediverse and beyond — and we’d love your help
                            making it even better. We have two repositories, one
                            for the backend and one for the Frontend. Developers
                            can fork the repo, implement new ideas, fix bugs, or
                            improve performance, and then open a pull request.
                            If you’re not into coding but still want to help,
                            feel free to share feedback or report issues
                            directly in the repository.
                        </p>

                        <div className="mt-4 flex flex-col md:flex-row gap-2">
                            <a
                                href="https://github.com/ghostbyte-dev/socialfolio-frontend"
                                className="bg-primary w-fit text-black hover:bg-primary-high border-none rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-md flex items-center px-4 py-2"
                            >
                                <Github className="mr-2 h-4 w-4" />
                                Github Frontend
                            </a>
                            <a
                                href="https://github.com/ghostbyte-dev/socialfolio-backend"
                                className="bg-primary w-fit text-black hover:bg-primary-high border-none rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-md flex items-center px-4 py-2"
                            >
                                <Github className="mr-2 h-4 w-4" />
                                Github Backend
                            </a>
                            <a
                                href="https://github.com/ghostbyte-dev/socialfolio-frontend/issues"
                                className="bg-primary w-fit text-black hover:bg-primary-high border-none rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-md flex items-center px-4 py-2"
                            >
                                <Github className="mr-2 h-4 w-4" />
                                Issues
                            </a>
                        </div>
                    </div>

                    <div className="wrapper p-8 col-span-2 md:col-span-1">
                        <h3 className="text-2xl font-bold">
                            Spread the word
                        </h3>
                        <p className="mt-2">
                            Like what we’re doing? Let others know! Share
                            Socialfolio with your friends, fellow developers,
                            and Fediverse enthusiasts. The more people know
                            about us, the faster we can grow, improve, and bring
                            new ideas to life. Join our community channels to
                            stay updated, share your thoughts, and help shape
                            the future of Socialfolio together.
                        </p>
                    </div>
                    <div className="wrapper p-8 col-span-2">
                        <h3 className="text-2xl font-bold">Donate</h3>
                        <p className="mt-2">
                            Your support helps us keep improving Socialfolio.
                            Donations allow us to dedicate more time to
                            developing new features, refining the user
                            experience, and maintaining the project for the long
                            run. They also help cover infrastructure costs.
                            Every contribution — big or small — makes a real
                            difference and helps us bring new ideas to life
                            faster.
                        </p>
                        <div className="mt-4 flex flex-row gap-2">
                            <a
                                href="https://www.buymeacoffee.com/daniebeler"
                                target="_blank"
                                rel="noopener"
                                className="transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                            >
                                <Image
                                    src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
                                    alt="Buy Me A Coffee"
                                    className="h-[60px] w-[217px]"
                                    width={217}
                                    height={60}
                                />
                            </a>
                            <a
                                href="https://en.liberapay.com/pixelix/"
                                target="_blank"
                                rel="noopener"
                                className="transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                            >
                                <LiberaPayLogo className="h-[60px] rounded-xl" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContributeSection;
