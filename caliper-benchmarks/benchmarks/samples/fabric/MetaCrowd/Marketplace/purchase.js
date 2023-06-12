/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

const { WorkloadModuleBase } = require("@hyperledger/caliper-core");

/**
 * Workload module for the benchmark round.
 */

const ipfsURL =
	"https://cloudflare-ipfs.com/ipfs/QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco/wiki/";
class CreateCarWorkload extends WorkloadModuleBase {
	/**
	 * Initializes the workload module instance.
	 */
	constructor() {
		super();
		this.txIndex = 0;
	}

	async initializeWorkloadModule(
		workerIndex,
		totalWorkers,
		roundIndex,
		roundArguments,
		sutAdapter,
		sutContext
	) {
		await super.initializeWorkloadModule(
			workerIndex,
			totalWorkers,
			roundIndex,
			roundArguments,
			sutAdapter,
			sutContext
		);
	}

	/**
	 * Assemble TXs for the round.
	 * @return {Promise<TxStatus[]>}
	 */
	async submitTransaction() {
		this.txIndex++;

		let itemId = this.workerIndex + "_Item" + this.txIndex.toString();
		let reqId = this.workerIndex + "_Purchase" + this.txIndex.toString();

		let args = {
			contractId: "metacrowd",
			contractVersion: "v1",
			contractFunction: "buyRequest",
			contractArguments: [itemId, reqId, ipfsURL], //itemId, reqId, encryptionKey
			readOnly: false,
		};

		if (this.txIndex === this.roundArguments.limit) {
			this.txIndex = 0;
		}

		await this.sutAdapter.sendRequests(args);
	}
}

/**
 * Create a new instance of the workload module.
 * @return {WorkloadModuleInterface}
 */
function createWorkloadModule() {
	return new CreateCarWorkload();
}

module.exports.createWorkloadModule = createWorkloadModule;