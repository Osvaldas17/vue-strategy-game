import {createStore} from 'vuex'

export default createStore({
    state: {
        locationSelected: null,
        buildingSelected: null,
        insufficientFunds: false,
        nextUpgrade: {
            cost: {
                gold: null,
                wood: null,
                stone: null,
            },
            profit: {
                gold: null,
                wood: null,
                stone: null,
            }
        },
        gatheringRates: {
            gold: 0,
            wood: 0,
            stone: 0

        },
        player: {
            stats: {
                gold: 10000,
                wood: 10000,
                stone: 10000
            },
            buildings: [null, null, null, null, null]
        },
        shop: [
            {
                name: "tent",
                image: "https://media.istockphoto.com/vectors/blue-pixel-art-tent-icon-isolated-on-white-background-camping-shelter-vector-id1267526943",
                level: 1,
                cost: {
                    gold: 10,
                    wood: 5,
                    stone: 4
                },
                profit: {
                    gold: 0.1,
                    wood: 0.1,
                    stone: 0.1
                },
                requires: []
            },
            {
                name: "house",
                image: "https://img.favpng.com/23/5/13/pixel-art-video-games-architecture-png-favpng-bcctUuzq1m7j5ckb6gKWHtzRx.jpg",
                level: 1,
                cost: {
                    gold: 50,
                    wood: 38,
                    stone: 80
                },
                profit: {
                    gold: 0.2,
                    wood: 0.1,
                    stone: 0.2
                },
                requires: ["tent"]
            },
            {
                name: "farm",
                image: "https://pbs.twimg.com/profile_images/1082467691540078592/7EcDN6fY.png",
                level: 1,
                cost: {
                    gold: 250,
                    wood: 400,
                    stone: 500
                },
                profit: {
                    gold: 0.3,
                    wood: 0.4,
                    stone: 0.2
                },
                requires: ["house"]
            },
            {
                name: "church",
                image: "https://thumbs.dreamstime.com/z/vector-pixel-art-church-vector-pixel-art-church-isolated-cartoon-150297114.jpg",
                level: 1,
                cost: {
                    gold: 3000,
                    wood: 500,
                    stone: 2000
                },
                profit: {
                    gold: 1,
                    wood: 0,
                    stone: 0
                },
                requires: ["house", "farm"]
            },
            {
                name: "maxima",
                image: "https://s1.15min.lt/images/photos/2020/08/18/original/vilniuje-lazdyneliu-gatveje-duris-atvere-nauja-maximos-parduotuve-5f3bf2276ea6d.jpg",
                level: 1,
                cost: {
                    gold: 10000,
                    wood: 2000,
                    stone: 2000
                },
                profit: {
                    gold: 10,
                    wood: 10,
                    stone: 10
                },
                requires: ["house", "farm", "church"]
            }
        ]
    },
    mutations: {
        selectBuildingSpot(state, payload) {
            state.locationSelected = payload
            state.buildingSelected = null
        },
        selectBuildingToUpgrade(state, payload) {
            state.buildingSelected = payload
            state.locationSelected = null
        },
        addBuilding(state, payload) {
            state.player.buildings[state.locationSelected] = {...payload}
            state.locationSelected = null
        },
        removeBuilding(state, index) {
            state.buildingSelected = null
            state.player.buildings[index] = null
        },
        addMaterials(state, [gold, wood, stone]) {
            state.player.stats.gold += Number(gold)
            state.player.stats.wood += Number(wood)
            state.player.stats.stone += Number(stone)
        },
        removeMaterials(state, [gold, wood, stone]) {
            state.player.stats.gold -= gold
            state.player.stats.wood -= wood
            state.player.stats.stone -= stone
        },
        nextUpgrade(state, payload) {
            state.nextUpgrade.cost = payload
        },
        nextUpgradeProfits(state, payload) {
            state.nextUpgrade.profit = payload
        },
        upgradeBuildingProfit(state, payload) {
            state.player.buildings[state.buildingSelected].profit = payload
        },
        profitRates(state, payload) {
            state.gatheringRates = payload
        },
        insufficientFunds(state) {
            state.insufficientFunds = true
            setTimeout(() => { state.insufficientFunds = false },1000);
        }
    },
    actions: {
        sellBuilding({commit, dispatch}, [payload, index]) {
            commit('removeBuilding', index)
            commit('addMaterials', [payload.cost.gold / 2, payload.cost.wood / 2, payload.cost.stone / 2])
            dispatch('setGatheringRates')
        },
        resourceBuildUp({state,commit}) {
            setInterval(() => {
                let gold = state.gatheringRates.gold.toFixed(1);
                let wood = state.gatheringRates.wood.toFixed(1);
                let stone = state.gatheringRates.stone.toFixed(1);
                commit('addMaterials',[gold, wood, stone])
            },1000)
        },
        setGatheringRates({state, commit}) {
            state.gatheringRates.gold = 0
            state.gatheringRates.wood = 0
            state.gatheringRates.stone = 0
            state.player.buildings.filter(e => {
                if (e !== null) {
                    let profit = {
                        gold: state.gatheringRates.gold + Number(e.profit.gold),
                        wood: state.gatheringRates.wood + Number(e.profit.wood),
                        stone: state.gatheringRates.stone + Number(e.profit.stone)
                    }
                    commit('profitRates', profit)
                }
            })
        },
        purchaseBuilding({state, commit, dispatch}, payload) {
            if (state.player.stats.gold >= payload.cost.gold &&
                state.player.stats.wood >= payload.cost.wood &&
                state.player.stats.stone >= payload.cost.stone) {
                commit('removeMaterials', [payload.cost.gold, payload.cost.wood, payload.cost.stone])
                commit('addBuilding', payload)
                dispatch('setGatheringRates')
            } else commit('insufficientFunds')
        },
        setNextUpgrade({state, commit}) {
            if (state.buildingSelected || state.buildingSelected === 0 || state.player.buildings[state.buildingSelected].level < 5) {
                const profit = state.player.buildings[state.buildingSelected].profit
                const level = state.player.buildings[state.buildingSelected].level
                const materialsForNextUpgrade = {
                    gold: level * 5 * state.player.buildings[state.buildingSelected].cost.gold,
                    wood: level * 5 * state.player.buildings[state.buildingSelected].cost.wood,
                    stone: level * 5 * state.player.buildings[state.buildingSelected].cost.stone
                }
                const profitObj = {
                    gold: (level + 1) * profit.gold,
                    wood: (level + 1) * profit.wood,
                    stone: (level + 1) * profit.stone
                }
                commit('nextUpgrade', materialsForNextUpgrade)
                commit('nextUpgradeProfits', profitObj)
            }
        },
        upgradeBuilding({state, commit, dispatch}) {
            const selected = state.buildingSelected
            const reqGold = state.nextUpgrade.cost.gold
            const reqWood = state.nextUpgrade.cost.wood
            const reqStone = state.nextUpgrade.cost.stone
            if (state.player.stats.gold >= reqGold &&
                state.player.stats.wood >= reqWood &&
                state.player.stats.stone >= reqStone &&
                state.player.buildings[state.buildingSelected].level < 5) {
                state.player.buildings[selected].level += 1
                const profit = {
                    gold: state.player.buildings[selected].profit.gold * state.player.buildings[selected].level,
                    wood: state.player.buildings[selected].profit.wood * state.player.buildings[selected].level,
                    stone: state.player.buildings[selected].profit.stone * state.player.buildings[selected].level
                }
                commit('upgradeBuildingProfit', profit)
                commit('removeMaterials', [reqGold, reqWood, reqStone])
                dispatch('setNextUpgrade')
                dispatch('setGatheringRates')
            } else {
                commit('insufficientFunds')
            }
        }

    },
    modules: {}
})
