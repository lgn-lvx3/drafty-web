// {
//     "tid": 0,
//     "cid": 1,
//     "did": 7,
//     "region": "Arizona",
//     "name": "Cardinals",
//     "abbrev": "ARI",
//     "pop": 4.9,
//     "imgURL": "https://i.ibb.co/ZKbvHh5/Arizona-Cardinals-logo.png",
//     "colors": [
//       "#97233F",
//       "#FFFFFF",
//       "#FFFFFF"
//         ]
//   },
export type Team = {
	tid: number;
	cid: number;
	did: number;
	region: string;
	name: string;
	abbrev: string;
	pop: number;
	imgURL: string;
	colors: [string, string, string];
};
