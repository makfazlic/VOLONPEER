export default function Dashboard(props) {
    return (
        <>
            <div className="flex-auto">
                <div className="sm:flex flex-col md:flex-row justify-evenly">

                    <div className="card compact side bg-base-100">
                        <div className="flex-row items-center space-x-4 card-body">
                            <div>
                                <div className="avatar">
                                    <div className="rounded-full w-14 h-14 shadow">
                                        <img src="https://i.pravatar.cc/500?img=32"></img>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h2 className="card-title">{props.userName}</h2>
                                <p className="text-base-content text-opacity-40">Rank of the User</p>
                            </div>
                        </div>
                    </div>

                    <div className="sm:w-screen md:w-1/4 mt-2 stats r-10 ">
                        <div className="stat">
                            <div className="stat-figure text-primary">
                                <button className="btn btn-circle btn-lg bg-base-200 btn-ghost"></button>
                            </div>
                            <div className="stat-value">4,900/7,300</div>
                            <div className="stat-title">Progress to next Rank</div>
                            <div className="stat-desc">
                                <progress value="60" max="100" className="progress progress-secondary"></progress>
                            </div>
                        </div>
                    </div>
                </div>



                <div className="mb-20 flex overflow-x-scroll pb-10 mt-10 scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-100 ml-60  md: ml-0">
                    <div className="flex flex-nowrap lg:ml-40 md:ml-20 ml-10">
                        <div className="inline-block px-3 sm: px-0">
                            <div className="w-96 h-96 max-w-xs overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
                                <p>Something </p>
                                <button>Something </button>
                            </div>
                        </div>

                        <div className="inline-block px-3 sm: px-0">
                            <div className="w-96 h-96 max-w-xs overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
                                <p>Something </p>
                                <button>Something </button>
                            </div>
                        </div>

                        <div className="inline-block px-3 sm: px-0">
                            <div className="w-96 h-96 max-w-xs overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
                                <p>Something </p>
                                <button>Something </button>
                            </div>
                        </div>

                        <div className="inline-block px-3 sm: px-0">
                            <div className="w-96 h-96 max-w-xs overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
                                <p>Something </p>
                                <button>Something </button>
                            </div>
                        </div>

                        <div className="inline-block px-3 sm: px-0">
                            <div className="w-96 h-96 max-w-xs overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
                                <p>Something </p>
                                <button>Something </button>
                            </div>
                        </div>

                        <div className="inline-block px-3 sm: px-0">
                            <div className="w-96 h-96 max-w-xs overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
                                <p>Something </p>
                                <button>Something </button>
                            </div>
                        </div>

                        <div className="inline-block px-3 sm: px-0">
                            <div className="w-96 h-96 max-w-xs overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
                                <p>Something </p>
                                <button>Something </button>
                            </div>
                        </div>

                        <div className="inline-block px-3 sm: px-0">
                            <div className="w-96 h-96 max-w-xs overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
                                <p>Something </p>
                                <button>Something </button>
                            </div>
                        </div>


                    </div>
                </div>
            </div>

        </>

    )
}