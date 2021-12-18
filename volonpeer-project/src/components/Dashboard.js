export default function Dashboard(props) {
    return (
        <>
            <div className="container mx-auto mt-20 flex flex-row w-full">
                <div className=" border w-1/4">
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



                    <div className="w-full mt-2 stats">
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

                <div class="divider divider-vertical bg-400/20"></div>
                <div className="w-2/3">
                    <p className="text-right text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">Trophies</p>
                </div>
            </div>



            <div className="mb-20 flex flex-row w-full">
                <div className="card text-center shadow-2xl mt-20 w-1/4">
                    <figure className="px-10 pt-10">
                        <img src="https://picsum.photos/id/1005/400/250" className="rounded-xl" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">shadow, center, padding</h2>
                        <p>Rerum reiciendis beatae tenetur excepturi aut pariatur est eos. Sit sit necessitatibus veritatis sed molestiae voluptates incidunt iure sapiente.</p>
                        <div className="justify-center card-actions">
                            <button className="btn btn-outline btn-accent">More info</button>
                        </div>
                    </div>
                </div>

                <div className="card text-center shadow-2xl mt-20 w-1/4">
                    <figure className="px-10 pt-10">
                        <img src="https://picsum.photos/id/1005/400/250" className="rounded-xl" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">shadow, center, padding</h2>
                        <p>Rerum reiciendis beatae tenetur excepturi aut pariatur est eos. Sit sit necessitatibus veritatis sed molestiae voluptates incidunt iure sapiente.</p>
                        <div className="justify-center card-actions">
                            <button className="btn btn-outline btn-accent">More info</button>
                        </div>
                    </div>
                </div>

                <div className="card text-center shadow-2xl mt-20 w-1/4">
                    <figure className="px-10 pt-10">
                        <img src="https://picsum.photos/id/1005/400/250" className="rounded-xl" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">shadow, center, padding</h2>
                        <p>Rerum reiciendis beatae tenetur excepturi aut pariatur est eos. Sit sit necessitatibus veritatis sed molestiae voluptates incidunt iure sapiente.</p>
                        <div className="justify-center card-actions">
                            <button className="btn btn-outline btn-accent">More info</button>
                        </div>
                    </div>
                </div>

                <div className="card text-center shadow-2xl mt-20 w-1/4">
                    <figure className="px-10 pt-10">
                        <img src="https://picsum.photos/id/1005/400/250" className="rounded-xl" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">shadow, center, padding</h2>
                        <p>Rerum reiciendis beatae tenetur excepturi aut pariatur est eos. Sit sit necessitatibus veritatis sed molestiae voluptates incidunt iure sapiente.</p>
                        <div className="justify-center card-actions">
                            <button className="btn btn-outline btn-accent">More info</button>
                        </div>
                    </div>
                </div>

                <div className="card text-center shadow-2xl mt-20 w-1/4">
                    <figure className="px-10 pt-10">
                        <img src="https://picsum.photos/id/1005/400/250" className="rounded-xl" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">shadow, center, padding</h2>
                        <p>Rerum reiciendis beatae tenetur excepturi aut pariatur est eos. Sit sit necessitatibus veritatis sed molestiae voluptates incidunt iure sapiente.</p>
                        <div className="justify-center card-actions">
                            <button className="btn btn-outline btn-accent">More info</button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}