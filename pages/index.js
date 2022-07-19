import React, { Component } from "react";
import {
	ChevronDownIcon,
	PlusIcon,
	DotsVerticalIcon,
	PlusCircleIcon,
	ArrowNarrowLeftIcon,
	ArrowNarrowRightIcon,
	TrashIcon
} from "@heroicons/react/outline";
import Layout from "../components/Layout";

export default class KanbanBoard extends Component {
	constructor() {
		super();
		this.state = {
			tasks: [
				{ name: "1. Coding", stage: 0 },
				{ name: "2. Swimming", stage: 0 },
				{ name: "3. Running", stage: 0 },
				{
					name: "4. Meeting with client in the middle of night at cafe",
					stage: 0
				}
			],
			input: "",
			showForm: false
		};
		this.stagesNames = ["Backlog", "To Do", "Ongoing", "Done"];
	}

	render() {
		console.log("1. state", this.state);
		const { tasks } = this.state;

		//create empty array for 4 stages
		let stagesTasks = [];
		for (let i = 0; i < this.stagesNames.length; ++i) {
			stagesTasks.push([]);
			// stagesTasks.push([]);
		}
		console.log("2. stagesTasks", stagesTasks);

		//looping item state tasks, not run first when task empty
		for (let task of tasks) {
			console.log("3. dlm for of: ");
			console.log("4. state tasks yg di loop", tasks);
			console.log("5. task", task);
			//get id stage
			const stageId = task.stage;
			console.log("6. stageId", stageId);
			console.log("7. stagesTasks[stageId]", stagesTasks[stageId]);
			//push task to empty stagesTasks[i] index, [i] === [stageId]
			//first task in to idx 0, (Backlog)
			stagesTasks[stageId].push(task);
		}
		console.log("8. stagesTasks after for of", stagesTasks);

		const handleCreateTask = () => {
			if (this.state.input !== "") {
				let d = [].concat(this.state.tasks);
				d.push({ name: this.state.input, stage: 0 });
				this.setState({
					tasks: d,
					input: "",
					showForm: false
				});
			}
		};

		const handleNextArrow = (idx, index, taskName) => {
			console.log("13. handleNextArrow idx", idx);
			console.log("14. index", index);
			console.log("15. taskName", taskName);
			let d = [].concat(this.state.tasks);
			console.log("16. d", d);
			let selectedIndex = null;
			// console.log(first);
			d.map((item, itemIndex) => {
				if (item.name == taskName) {
					selectedIndex = itemIndex;
				}
			});

			d[selectedIndex].stage = idx + 1;
			this.setState({
				tasks: d
			});
		};

		const handlePreviousArrow = (idx, index, taskName) => {
			let d = [].concat(this.state.tasks);
			let selectedIndex = null;
			d.map((item, itemIndex) => {
				if (item.name == taskName) {
					selectedIndex = itemIndex;
				}
			});

			d[selectedIndex].stage = idx - 1;
			this.setState({
				tasks: d
			});
		};

		const handleDelete = (idx, index, taskName) => {
			let d = [].concat(this.state.tasks);
			// console.log(d);
			let selectedIndex = null;
			d.map((item, itemIndex) => {
				if (item.name == taskName) {
					selectedIndex = itemIndex;
				}
			});
			// console.log(selectedIndex);

			d.splice(selectedIndex, 1);
			this.setState({
				tasks: d
			});
		};
		return (
			<Layout>
				<div className="mt-20 bg-white p-10 rounded-2xl container">
					<div className="flex justify-center">
						<div className="mt-50 ">
							{this.state.showForm ? (
								<>
									<input
										id="create-task-input"
										type="text"
										className="large p-2 my-3 text-md border-2 mr-3 border-gray-300 rounded-md bg-background w-80"
										placeholder="New task name here..."
										data-id="create-task-input"
										value={this.state.input}
										onChange={(e) => {
											this.setState({ input: e.target.value });
										}}
									/>
									<button
										type="submit"
										className="ml-30 bg-basic text-white p-2 text-md border-2 border-basic rounded-md w-36"
										data-id="create-task-button"
										onClick={handleCreateTask}
									>
										Add task
									</button>
								</>
							) : (
								<button
									className="flex justify-center items-center my-3 space-x-2 text-md bg-background p-2 border-dashed	border-2 border-gray-200  ring-gray-700 hover:border-basic group w-60 rounded-md"
									onClick={(e) => {
										this.setState({ showForm: true });
									}}
								>
									<PlusCircleIcon className="w-6 h-6 text-gray-700 group-hover:text-basic " />
									<span className="text-gray-700 text-md font-semibold group-hover:text-basic ">
										Create Task
									</span>
								</button>
							)}
						</div>
					</div>

					<div className="mt-50 grid grid-cols-1 sm:grid-cols-4 gap-10 my-5 ">
						{stagesTasks.map((tasks, i) => {
							console.log("9. maping task arr empty stagesTasks", tasks);
							console.log("i task", i);
							{
								/* console.log("this.stagesNames", this.stagesNames); */
							}
							console.log("10. this.stagesNames[i]", this.stagesNames[i]);
							return (
								<div className="card outlined mt-0 " key={`${i}`}>
									<div className="card-text py-2 bg-basic">
										<p
											className={`${
												this.stagesNames[i] === "Backlog"
													? "text-red-500"
													: "text-black"
											} text-xl font-bold mb-4`}
										>
											{this.stagesNames[i]}
										</p>
										<ul className="styled mt-50" data-id={`stage-${i}`}>
											{tasks.map((task, index) => {
												console.log("11. task 2d", task);
												console.log("12. index task 2d", index);
												return (
													<li
														className="slide-up-fade-in border-solid border-2 border-gray-200 rounded-md mb-4"
														key={`${i}${index}`}
													>
														<div className="li-content layout-row justify-content-between align-items-center">
															<p
																data-id={`${task.name
																	.split(" ")
																	.join("-")}-name`}
																className="mb-4"
															>
																{task.name}
															</p>
															<div className="icons  flex justify-end">
																<button
																	className="icon-only x-small mx-2"
																	disabled={i == 0 ? true : false}
																	onClick={() =>
																		handlePreviousArrow(i, index, task.name)
																	}
																	data-id={`${task.name
																		.split(" ")
																		.join("-")}-back`}
																>
																	<ArrowNarrowLeftIcon
																		// className="w-8 h-8 text-basic rounded-md  "
																		className={`${
																			this.stagesNames[i] === "Backlog"
																				? "text-gray-300"
																				: "text-basic"
																		} w-8 h-8 rounded-md`}
																	/>
																</button>
																<button
																	className="icon-only x-small mx-2"
																	disabled={i == 3 ? true : false}
																	data-id={`${task.name
																		.split(" ")
																		.join("-")}-forward`}
																	onClick={() =>
																		handleNextArrow(i, index, task.name)
																	}
																>
																	<ArrowNarrowRightIcon
																		// className="w-8 h-8 text-basic rounded-md  "
																		className={`${
																			this.stagesNames[i] === "Done"
																				? "text-gray-300"
																				: "text-basic"
																		} w-8 h-8 rounded-md`}
																	/>
																</button>
																<button
																	className="icon-only danger x-small mx-2"
																	data-id={`${task.name
																		.split(" ")
																		.join("-")}-delete`}
																	onClick={() =>
																		handleDelete(i, index, task.name)
																	}
																>
																	<TrashIcon className="w-8 h-8 text-basic rounded-md  " />
																</button>
															</div>
														</div>
													</li>
												);
											})}
										</ul>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</Layout>
		);
	}
}
