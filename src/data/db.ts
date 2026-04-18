export type StageType = "诊断关" | "理解关" | "迁移关" | "复测关";

export interface Question {
  id: string;
  unitId: string;
  knowledgeNodeId: string;
  stageType: StageType;
  stem: string;
  options: string[];
  answer: string;
  sceneType?: "cube" | "cube_mesh" | "water_cube" | "fraction" | "chart" | "balance" | "number" | "rotate" | "generic";
  sceneProps?: any;
}

export interface KnowledgeNode {
  id: string;
  unitId: string;
  name: string;
  questions: Question[];
}

export interface Unit {
  id: string;
  name: string;
  nodes: KnowledgeNode[];
}

export const units: Unit[] = [
  {
    id: "U1",
    name: "观察物体(三)",
    nodes: [
      {
        id: "u1_k01",
        unitId: "U1",
        name: "从不同方向观察立体图形",
        questions: [
          { id: "u1_k01_1", unitId: "U1", knowledgeNodeId: "u1_k01", stageType: "诊断关", stem: "有一个由3个小正方体并排摆成一排的物体，这是什么形状？", options: ["3个排成一行", "L形", "田字形", "竖着排"], answer: "3个排成一行", sceneType: "cube", sceneProps: { cubes: [[-1,0,0], [0,0,0], [1,0,0]] } },
          { id: "u1_k01_2", unitId: "U1", knowledgeNodeId: "u1_k01", stageType: "理解关", stem: "如果左边高出了一格，这个物体一共有几个正方体？", options: ["2个", "3个", "4个", "5个"], answer: "4个", sceneType: "cube", sceneProps: { cubes: [[-1,0,0], [0,0,0], [1,0,0], [-1,1,0]] } },
          { id: "u1_k01_3", unitId: "U1", knowledgeNodeId: "u1_k01", stageType: "迁移关", stem: "如果正中间凸起，从右边看是什么形状？", options: ["一行2个", "一列2个", "田字", "L形"], answer: "一列2个", sceneType: "cube", sceneProps: { cubes: [[-1,0,0], [0,0,0], [1,0,0], [0,1,0]] } },
          { id: "u1_k01_4", unitId: "U1", knowledgeNodeId: "u1_k01", stageType: "复测关", stem: "仔细观察，这是一个立体的十字形吗？", options: ["是", "不是", "无法判断", "是L形"], answer: "是", sceneType: "cube", sceneProps: { cubes: [[-1,0,0], [0,0,0], [1,0,0], [0,1,0], [0,0,-1], [0,0,1]] } }
        ]
      }
    ]
  },
  {
    id: "U2",
    name: "因数与倍数",
    nodes: [
      {
        id: "u2_k01",
        unitId: "U2",
        name: "因数与倍数的关系",
        questions: [
          { id: "u2_k01_1", unitId: "U2", knowledgeNodeId: "u2_k01", stageType: "诊断关", stem: "观察数字阵列，4 和 9 乘起来等于多少？", options: ["24", "36", "45", "13"], answer: "36", sceneType: "number", sceneProps: { numbers: [4, 9, 36], emphasize: 36 } },
          { id: "u2_k01_2", unitId: "U2", knowledgeNodeId: "u2_k01", stageType: "理解关", stem: "阵列中的 10 是 5 的什么？", options: ["因数", "倍数", "无关的数", "质数"], answer: "倍数", sceneType: "number", sceneProps: { numbers: [5, 10, 15], emphasize: 10 } },
          { id: "u2_k01_3", unitId: "U2", knowledgeNodeId: "u2_k01", stageType: "迁移关", stem: "2 和 3 的最小公倍数是阵列中哪个红色的数？", options: ["2", "3", "5", "6"], answer: "6", sceneType: "number", sceneProps: { numbers: [2, 3, 6], emphasize: 6 } },
          { id: "u2_k01_4", unitId: "U2", knowledgeNodeId: "u2_k01", stageType: "复测关", stem: "7 的两倍是多少？看谁被点亮了！", options: ["7", "14", "21", "28"], answer: "14", sceneType: "number", sceneProps: { numbers: [7, 14, 21], emphasize: 14 } }
        ]
      }
    ]
  },
  {
    id: "U3",
    name: "长方体和正方体",
    nodes: [
      {
        id: "u3_k04",
        unitId: "U3",
        name: "表面积与体积计算",
        questions: [
          { id: "u3_k04_1", unitId: "U3", knowledgeNodeId: "u3_k04", stageType: "诊断关", stem: "这个长方体（长3, 宽2, 高2）的表面积是多少？", options: ["24", "32", "36", "40"], answer: "32", sceneType: "cube_mesh", sceneProps: { dimensions: [3, 2, 2] } },
          { id: "u3_k04_2", unitId: "U3", knowledgeNodeId: "u3_k04", stageType: "理解关", stem: "长4, 宽3, 高1.5 长方体的底面积是多少？", options: ["6", "12", "18", "24"], answer: "12", sceneType: "cube_mesh", sceneProps: { dimensions: [4, 1.5, 3] } },
          { id: "u3_k04_3", unitId: "U3", knowledgeNodeId: "u3_k04", stageType: "迁移关", stem: "这是一个各边相等(2.5)的正方体，它的所有棱长和是多少？", options: ["25", "30", "15", "6.25"], answer: "30", sceneType: "cube_mesh", sceneProps: { dimensions: [2.5, 2.5, 2.5] } },
          { id: "u3_k04_4", unitId: "U3", knowledgeNodeId: "u3_k04", stageType: "复测关", stem: "观察长方体的体积大小（长3高4宽3），算算它的体积！", options: ["24", "30", "36", "48"], answer: "36", sceneType: "cube_mesh", sceneProps: { dimensions: [3, 4, 3] } }
        ]
      },
      {
        id: "u3_k07",
        unitId: "U3",
        name: "容积与容积单位",
        questions: [
          { id: "u3_k07_1", unitId: "U3", knowledgeNodeId: "u3_k07", stageType: "诊断关", stem: "水箱当前的水位大约达到了多少分之多少？", options: ["1/4", "1/2", "4/5", "1/10"], answer: "4/5", sceneType: "water_cube", sceneProps: { dimensions: [2.5, 3.5, 2.5], level: 0.8 } },
          { id: "u3_k07_2", unitId: "U3", knowledgeNodeId: "u3_k07", stageType: "理解关", stem: "水恰好在正中间，如果加满还需要加同样多的水吗？", options: ["需要", "不需要", "不确定", "需要两倍"], answer: "需要", sceneType: "water_cube", sceneProps: { dimensions: [3, 3, 3], level: 0.5 } },
          { id: "u3_k07_3", unitId: "U3", knowledgeNodeId: "u3_k07", stageType: "迁移关", stem: "水只有浅浅的一层，它占总容器的？", options: ["20%", "50%", "80%", "10%"], answer: "20%", sceneType: "water_cube", sceneProps: { dimensions: [4, 2, 2], level: 0.2 } },
          { id: "u3_k07_4", unitId: "U3", knowledgeNodeId: "u3_k07", stageType: "复测关", stem: "快溢出来了！此时的水位在哪？", options: ["底部", "中部", "顶部", "空气中"], answer: "顶部", sceneType: "water_cube", sceneProps: { dimensions: [2, 4, 2], level: 0.95 } }
        ]
      }
    ]
  },
  {
    id: "U4",
    name: "分数的意义和性质",
    nodes: [
      {
        id: "u4_k01",
        unitId: "U4",
        name: "单位“1”与分数意义",
        questions: [
          { id: "u4_k01_1", unitId: "U4", knowledgeNodeId: "u4_k01", stageType: "诊断关", stem: "圆盘被分成了8份，绿色的占多少？", options: ["3/8", "1/8", "5/8", "8/8"], answer: "3/8", sceneType: "fraction", sceneProps: { total: 8, active: 3 } },
          { id: "u4_k01_2", unitId: "U4", knowledgeNodeId: "u4_k01", stageType: "理解关", stem: "分成6份，只亮起2份，还能怎么表示？", options: ["1/3", "1/2", "2/3", "4/6"], answer: "1/3", sceneType: "fraction", sceneProps: { total: 6, active: 2 } },
          { id: "u4_k01_3", unitId: "U4", knowledgeNodeId: "u4_k01", stageType: "迁移关", stem: "一共5份，亮起4份，这是真分数还是假分数？", options: ["真分数", "假分数", "带分数", "整数"], answer: "真分数", sceneType: "fraction", sceneProps: { total: 5, active: 4 } },
          { id: "u4_k01_4", unitId: "U4", knowledgeNodeId: "u4_k01", stageType: "复测关", stem: "10份中的7份，写成小数是？", options: ["0.7", "7.0", "0.07", "1.7"], answer: "0.7", sceneType: "fraction", sceneProps: { total: 10, active: 7 } }
        ]
      }
    ]
  },
  {
    id: "U5",
    name: "图形的运动(三)",
    nodes: [
      {
        id: "u5_k01",
        unitId: "U5",
        name: "平面与立体图形旋转",
        questions: [
          { id: "u5_k01_1", unitId: "U5", knowledgeNodeId: "u5_k01", stageType: "诊断关", stem: "该图形整体发生了多少度的旋转？（看它的直角偏转）", options: ["90度", "180度", "270度", "45度"], answer: "90度", sceneType: "rotate", sceneProps: { angle: 90 } },
          { id: "u5_k01_2", unitId: "U5", knowledgeNodeId: "u5_k01", stageType: "理解关", stem: "翻转到了完全相反的一面！这是多少度旋转？", options: ["90度", "180度", "360度", "0度"], answer: "180度", sceneType: "rotate", sceneProps: { angle: 180 } },
          { id: "u5_k01_3", unitId: "U5", knowledgeNodeId: "u5_k01", stageType: "迁移关", stem: "旋转270度，相当于反方向旋转多少度？", options: ["90度", "180度", "270度", "0度"], answer: "90度", sceneType: "rotate", sceneProps: { angle: 270 } },
          { id: "u5_k01_4", unitId: "U5", knowledgeNodeId: "u5_k01", stageType: "复测关", stem: "旋转了整整一圈！它回到了原位吗？", options: ["是", "否", "改变了大小", "改变了形状"], answer: "是", sceneType: "rotate", sceneProps: { angle: 360 } }
        ]
      }
    ]
  },
  {
    id: "U6",
    name: "分数的加法和减法",
    nodes: [
      {
        id: "u6_k01",
        unitId: "U6",
        name: "分数加减法运算",
        questions: [
          { id: "u6_k01_1", unitId: "U6", knowledgeNodeId: "u6_k01", stageType: "诊断关", stem: "绿色4份(4/8)加黄色1份(1/8)，一共是多少？", options: ["5/8", "6/8", "3/8", "4/8"], answer: "5/8", sceneType: "fraction", sceneProps: { total: 8, active: 4, secondary: 1 } },
          { id: "u6_k01_2", unitId: "U6", knowledgeNodeId: "u6_k01", stageType: "理解关", stem: "绿色2/6加黄色2/6等于4/6，化简后是？", options: ["2/3", "1/2", "1/3", "5/6"], answer: "2/3", sceneType: "fraction", sceneProps: { total: 6, active: 2, secondary: 2 } },
          { id: "u6_k01_3", unitId: "U6", knowledgeNodeId: "u6_k01", stageType: "迁移关", stem: "如果去掉这两块黄色的区域，算是加法还是减法对应的概念？", options: ["加法", "减法", "乘法", "除法"], answer: "减法", sceneType: "fraction", sceneProps: { total: 10, active: 5, secondary: 0 } },
          { id: "u6_k01_4", unitId: "U6", knowledgeNodeId: "u6_k01", stageType: "复测关", stem: "绿色3份，黄色3份，它们的和接近整个圆了吗？", options: ["是，非常接近", "不，只有一半", "只是1/4", "超过了圆"], answer: "是，非常接近", sceneType: "fraction", sceneProps: { total: 7, active: 3, secondary: 3 } }
        ]
      }
    ]
  },
  {
    id: "U7",
    name: "折线统计图",
    nodes: [
      {
        id: "u7_k01",
        unitId: "U7",
        name: "绘制与分析折线图",
        questions: [
          { id: "u7_k01_1", unitId: "U7", knowledgeNodeId: "u7_k01", stageType: "诊断关", stem: "看图表中的金线！数据的整体趋势是？", options: ["上升", "下降", "平稳", "波动"], answer: "上升", sceneType: "chart", sceneProps: { points: [10, 30, 50, 70, 90] } },
          { id: "u7_k01_2", unitId: "U7", knowledgeNodeId: "u7_k01", stageType: "理解关", stem: "这是一条快速下跌的曲线，通常代表什么现象？", options: ["气温骤降", "身高增长", "体重增长", "考试分高"], answer: "气温骤降", sceneType: "chart", sceneProps: { points: [80, 60, 40, 20, 10] } },
          { id: "u7_k01_3", unitId: "U7", knowledgeNodeId: "u7_k01", stageType: "迁移关", stem: "这个趋势上上下下，可以用哪个词形容？", options: ["起伏波动", "直线平稳", "匀速下降", "直线下降"], answer: "起伏波动", sceneType: "chart", sceneProps: { points: [20, 50, 40, 80, 60] } },
          { id: "u7_k01_4", unitId: "U7", knowledgeNodeId: "u7_k01", stageType: "复测关", stem: "前三个点都持平，只有最末尾翘起来了，这叫什么？", options: ["突破增长", "一路暴跌", "匀速下降", "一直在低谷"], answer: "突破增长", sceneType: "chart", sceneProps: { points: [15, 15, 15, 60, 90] } }
        ]
      }
    ]
  },
  {
    id: "U8",
    name: "数学广角",
    nodes: [
      {
        id: "u8_k01",
        unitId: "U8",
        name: "用天平找次品",
        questions: [
          { id: "u8_k01_1", unitId: "U8", knowledgeNodeId: "u8_k01", stageType: "诊断关", stem: "天平明显往左倾斜了！哪边的物体更重？", options: ["左边", "右边", "一样重", "都有次品"], answer: "左边", sceneType: "balance", sceneProps: { tilt: 10, left: 4, right: 3 } },
          { id: "u8_k01_2", unitId: "U8", knowledgeNodeId: "u8_k01", stageType: "理解关", stem: "天平现在往右倾斜，说明什么？", options: ["右边重", "左边重", "一样重", "左边次品多"], answer: "右边重", sceneType: "balance", sceneProps: { tilt: -10, left: 3, right: 4 } },
          { id: "u8_k01_3", unitId: "U8", knowledgeNodeId: "u8_k01", stageType: "迁移关", stem: "天平平衡了！没上称的那个是次品吗（假设次品较重）？", options: ["是", "不是", "无法判断", "次品在称上"], answer: "是", sceneType: "balance", sceneProps: { tilt: 0, left: 2, right: 2 } },
          { id: "u8_k01_4", unitId: "U8", knowledgeNodeId: "u8_k01", stageType: "复测关", stem: "两边各放5个，天平发生了微小的倾斜，需要重新分组吗？", options: ["需要把重的重分", "需要把轻的重分", "直接丢掉", "不分了"], answer: "需要把重的重分", sceneType: "balance", sceneProps: { tilt: 5, left: 5, right: 5 } }
        ]
      }
    ]
  }
];

export function getQuestionsByNode(nodeId: string): Question[] {
  for (const unit of units) {
    const node = unit.nodes.find(n => n.id === nodeId);
    if (node) return node.questions;
  }
  return [];
}
