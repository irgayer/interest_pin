import { posts } from '$db/posts';

export async function load() {
    let topThemes = await posts.aggregate([{$unwind: "$themes"}, {$project: {"themes": 1}}, {$group: {_id: "$themes", count: {$count: {}}}}, {$sort: {count: -1}}, {$limit: 10}])
    .toArray();

    return {
        themes: topThemes
    }
}