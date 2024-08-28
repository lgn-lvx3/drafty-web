// active
// :
// false
// age
// :
// 28
// birth_city
// :
// null
// birth_country
// :
// null
// birth_date
// :
// "1988-12-01"
// birth_state
// :
// null
// college
// :
// "Tulsa"
// competitions
// :
// []
// depth_chart_order
// :
// null
// depth_chart_position
// :
// null
// espn_id
// :
// 15299
// fantasy_data_id
// :
// 18
// fantasy_positions
// :
// ['QB']
// first_name
// :
// "GJ"
// full_name
// :
// "GJ Kinne"
// gsis_id
// :
// null
// hashtag
// :
// "#gjkinne-NFL-FA-2"
// height
// :
// "6'2\""
// high_school
// :
// null
// injury_body_part
// :
// null
// injury_notes
// :
// null
// injury_start_date
// :
// null
// injury_status
// :
// null
// last_name
// :
// "Kinne"
// metadata
// :
// null
// news_updated
// :
// null
// number
// :
// 2
// oddsjam_id
// :
// null
// opta_id
// :
// null
// pandascore_id
// :
// null
// player_id
// :
// "1"
// position
// :
// "QB"
// practice_description
// :
// null
// practice_participation
// :
// null
// rotowire_id
// :
// 8833
// rotoworld_id
// :
// null
// search_first_name
// :
// "gj"
// search_full_name
// :
// "gjkinne"
// search_last_name
// :
// "kinne"
// search_rank
// :
// 9999999
// sport
// :
// "nfl"
// sportradar_id
// :
// "a668bd7d-56e5-45ff-a2c8-d618cd1fef95"
// stats_id
// :
// 399453
// status
// :
// "Inactive"
// swish_id
// :
// null
// team
// :
// null
// team_abbr
// :
// null
// team_changed_at
// :
// null
// weight
// :
// "234"
// id
// :
// 26154
// years_exp
// :
// 1

export type Player = {
	id: string;
	drafty_type: string;
	active: boolean;
	rotoworld_id: number | null;
	search_first_name: string;
	search_full_name: string;
	search_last_name: string;
	search_rank: number;
	sport: string;
	sportradar_id: string;
	stats_id: number;
	status: string;
	swish_id: number | null;
	team: string | null;
	team_abbr: string | null;
	team_changed_at: string | null;
	weight: string;
	years_exp: number;
	height: string;
	birth_date: string;
	college: string;
	depth_chart_order: number | null;
	depth_chart_position: string | null;
	espn_id: number;
	fantasy_data_id: number;
	fantasy_positions: string[];
	first_name: string;
	full_name: string;
	high_school: string | null;
	injury_body_part: string | null;
	injury_notes: string | null;
	injury_start_date: string | null;
	injury_status: string | null;
	last_name: string;
	number: number | null;
	position: string;
	practice_description: string | null;
	practice_participation: string | null;
};
