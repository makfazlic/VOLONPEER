export default function Stats() {
    return (
        <div className="pb-12 mt-20 bg-white container mx-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:text-center">
                    <h2 className="text-base text-blueish6 font-semibold tracking-wide uppercase">statistics</h2>
                    <p className="mt-2 text-5xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                        The numbers speak for themselves
                    </p>
                </div>

                <div className="mt-20">
                    <div className="w-full shadow stats">
                        <div className="stat place-items-center place-content-center">
                            <div className="stat-title">Users</div>
                            <div className="stat-value">310M</div>
                            <div className="stat-desc">Jan 1st - Feb 1st</div>
                        </div>
                        <div className="stat place-items-center place-content-center">
                            <div className="stat-title">Posts</div>
                            <div className="stat-value text-success">4,200</div>
                            <div className="stat-desc text-success">↗︎ 400 (22%)</div>
                        </div>
                        <div className="stat place-items-center place-content-center">
                            <div className="stat-title">Successfull colaborations</div>
                            <div className="stat-value text-error">1,200</div>
                            <div className="stat-desc text-error">↘︎ 90 (14%)</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}