import dayjs from 'dayjs';
import seedrandom from 'seedrandom';

// 时间范围映射表
export const timeRangeMap = {
  '10min': 10,
  '20min': 20,
  '30min': 30,
  '1h': 60,
  '2h': 120,
  '5h': 300,
  '12h': 720,
  '1d': 1440,
  '3d': 4320,
  '7d': 10080
};

// 故障类型定义
export const faultTypes = [
  { name: '连接超时', category: 'network', weight: 0.3 },
  { name: '数据库错误', category: 'database', weight: 0.25 },
  { name: '权限拒绝', category: 'security', weight: 0.2 },
  { name: '资源耗尽', category: 'resource', weight: 0.15 },
  { name: '配置错误', category: 'config', weight: 0.1 }
];

// 生成带权重的随机数
const weightedRandom = (min: number, max: number, weight = 1): number => {
  const random = Math.random();
  return Math.floor((min + (max - min) * Math.pow(random, weight)));
};

// 生成周期性波动值
const generateCyclicValue = (
  baseValue: number,
  time: dayjs.Dayjs,
  period: number = 60,
  amplitude: number = 0.2
): number => {
  const minuteOfDay = time.hour() * 60 + time.minute();
  const cyclePosition = (2 * Math.PI * minuteOfDay) / period;
  const fluctuation = Math.sin(cyclePosition) * amplitude;
  return baseValue * (1 + fluctuation);
};

// 生成时间序列数据
const generateTimeSeriesData = (
  timeRange: string,
  baseValue: number,
  probability: number,
  noise: number = 0.1
) => {
  const now = dayjs();
  const minutes = timeRangeMap[timeRange];
  const step = Math.max(1, Math.floor(minutes / 60));
  const data: any[] = [];

  for (let i = minutes - 1; i >= 0; i -= step) {
    const time = now.subtract(i, 'minute');
    if (Math.random() < probability) {
      const cyclicValue = generateCyclicValue(baseValue, time);
      const noiseValue = (Math.random() - 0.5) * noise * baseValue;
      const value = Math.max(0, Math.round(cyclicValue + noiseValue));
      if (value > 0) {
        data.push({
          time: time.format('YYYY-MM-DD HH:mm:ss'),
          value
        });
      }
    }
  }

  return data;
};

// 生成实例级别的时间序列数据
const generateInstanceTimeSeriesData = (
  timeRange: string,
  instances: string[],
  baseValue: number,
  probability: number
) => {
  const data: any[] = [];
  
  instances.forEach(instance => {
    const instanceData = generateTimeSeriesData(
      timeRange,
      baseValue * (0.8 + Math.random() * 0.4), // 为每个实例生成略微不同的基准值
      probability
    );
    
    instanceData.forEach(point => {
      data.push({
        ...point,
        instanceName: instance
      });
    });
  });

  return data.sort((a, b) => dayjs(a.time).unix() - dayjs(b.time).unix());
};

export class MockDataGenerator {
  private instances: string[] = ['实例1', '实例2', '实例3'];
  private timeRange: string;
  private serviceId: string;
  private baseCount: number;
  private rng: () => number;

  constructor(timeRange: string, serviceId: string) {
    this.timeRange = timeRange;
    this.serviceId = serviceId;
    
    // 根据时间范围动态调整基准数量
    const minutes = timeRangeMap[this.timeRange];
    this.baseCount = Math.floor(minutes / 60) * 10; // 每小时大约10个基准异常
    
    // 初始化随机数生成器
    const seed = this.timeRange + this.serviceId;
    this.rng = seedrandom(seed);
  }

  // 生成带时间特征的数据
  private generateTimeBasedValue(baseValue: number, time: dayjs.Dayjs): number {
    const hour = time.hour();
    const dayOfWeek = time.day();
    
    // 工作时间系数 (9:00-18:00 异常较多)
    const workHourFactor = (hour >= 9 && hour < 18) ? 1.5 : 0.7;
    
    // 工作日系数 (周末异常较少)
    const weekdayFactor = (dayOfWeek === 0 || dayOfWeek === 6) ? 0.6 : 1.2;
    
    // 高峰时段系数 (10-11点和15-16点异常较多)
    const peakHourFactor = ((hour === 10 || hour === 15) ? 1.8 : 1.0);
    
    // 计算最终值
    return Math.floor(baseValue * workHourFactor * weekdayFactor * peakHourFactor);
  }

  // 生成故障分类统计数据 - 作为基准数据，考虑时间特征
  generateFaultTypeStats() {
    const now = dayjs();
    const baseStats = faultTypes.map(type => {
      const baseValue = Math.floor(this.rng() * this.baseCount * type.weight);
      const adjustedValue = this.generateTimeBasedValue(baseValue, now);
      
      return {
        ...type,
        critical: Math.floor(adjustedValue * 0.3),
        warning: Math.floor(adjustedValue * 0.4),
        info: Math.floor(adjustedValue * 0.3)
      };
    });

    // 确保至少有一些数据
    if (baseStats.every(stat => 
      stat.critical + stat.warning + stat.info === 0)) {
      const randomType = baseStats[Math.floor(this.rng() * baseStats.length)];
      randomType.warning = 1;
    }

    return baseStats;
  }

  // 生成实例级别的权重
  private getInstanceWeights(): Record<string, number> {
    // 根据时间动态调整实例权重
    const hour = dayjs().hour();
    
    if (hour >= 9 && hour < 18) {
      // 工作时间：实例1承担主要负载
      return {
        '实例1': 0.5,
        '实例2': 0.3,
        '实例3': 0.2
      };
    } else if (hour >= 18 && hour < 22) {
      // 晚间：负载均衡
      return {
        '实例1': 0.34,
        '实例2': 0.33,
        '实例3': 0.33
      };
    } else {
      // 夜间：实例2和3承担主要负载
      return {
        '实例1': 0.2,
        '实例2': 0.4,
        '实例3': 0.4
      };
    }
  }

  // 生成已知异常数据 - 考虑时间特征和实例负载
  generateKnownAnomalies() {
    const faultStats = this.generateFaultTypeStats();
    const totalFaults = faultStats.reduce((sum, type) => 
      sum + type.critical + type.warning + type.info, 0);

    const now = dayjs();
    const minutes = timeRangeMap[this.timeRange];
    const step = Math.max(1, Math.floor(minutes / 60));
    const data: any[] = [];

    let remainingCount = totalFaults;
    const instanceWeights = this.getInstanceWeights();
    
    // 生成时间点，考虑工作时间分布
    const timePoints = Array.from({ length: Math.floor(minutes / step) }, (_, i) => i)
      .filter(i => {
        const time = now.subtract(i * step, 'minute');
        const hour = time.hour();
        // 工作时间的时间点更密集
        return hour >= 9 && hour < 18 ? this.rng() < 0.7 : this.rng() < 0.3;
      })
      .sort((a, b) => b - a);

    for (const timeIndex of timePoints) {
      if (remainingCount <= 0) break;
      
      const time = now.subtract(timeIndex * step, 'minute');
      const timeStr = time.format('YYYY-MM-DD HH:mm:ss');
      
      // 根据实例权重分配异常
      const random = this.rng();
      let instance = this.instances[0];
      let cumWeight = 0;
      
      for (const [inst, weight] of Object.entries(instanceWeights)) {
        cumWeight += weight;
        if (random <= cumWeight) {
          instance = inst;
          break;
        }
      }

      const value = Math.min(remainingCount, 
        Math.max(1, Math.floor(this.rng() * 5)));
      
      data.push({
        time: timeStr,
        instanceName: instance,
        value
      });
      
      remainingCount -= value;
    }

    return data.sort((a, b) => dayjs(a.time).unix() - dayjs(b.time).unix());
  }

  // 生成未知异常数据 - 确保与未知故障统计一致
  generateUnknownAnomalies() {
    // 首先获取未知故障总数
    const { count: totalCount } = this.generateUnknownFaultStats();
    
    if (totalCount === 0) {
      return [];
    }

    const now = dayjs();
    const minutes = timeRangeMap[this.timeRange];
    const step = Math.max(1, Math.floor(minutes / 60));
    const data: any[] = [];

    // 将总数随机分配到不同时间点和实例
    let remainingCount = totalCount;
    
    // 生成随机时间点，但不超过总时间范围的30%
    const maxTimePoints = Math.floor((minutes / step) * 0.3);
    const timePoints = Math.min(maxTimePoints, totalCount);
    
    // 创建时间点数组
    const timeIndices = Array.from({ length: Math.floor(minutes / step) }, (_, i) => i)
      .sort(() => Math.random() - 0.5)
      .slice(0, timePoints);

    // 按时间顺序排序
    timeIndices.sort((a, b) => b - a);

    for (const timeIndex of timeIndices) {
      if (remainingCount <= 0) break;
      
      const time = now.subtract(timeIndex * step, 'minute');
      const timeStr = time.format('YYYY-MM-DD HH:mm:ss');
      
      // 随机选择一个实例
      const instance = this.instances[Math.floor(Math.random() * this.instances.length)];
      // 为每个时间点分配1-3个异常，但不超过剩余数量
      const value = Math.min(remainingCount, Math.max(1, Math.floor(Math.random() * 3)));
      
      data.push({
        time: timeStr,
        instanceName: instance,
        value
      });
      
      remainingCount -= value;
    }

    // 如果还有剩余的计数，添加到最后一个时间点
    if (remainingCount > 0 && data.length > 0) {
      data[data.length - 1].value += remainingCount;
    }

    return data.sort((a, b) => dayjs(a.time).unix() - dayjs(b.time).unix());
  }

  // 生成未知故障统计数据
  generateUnknownFaultStats() {
    // 使用固定的随机种子来确保同一时间范围内生成相同的数据
    const seed = this.timeRange + this.serviceId;
    const rng = seedrandom(seed);
    
    const count = Math.floor(rng() * this.baseCount * 0.7); // 使用70%作为最大值
    const severity = Math.min(count / this.baseCount, 1);

    return { count, severity };
  }

  // 生成故障分布数据 - 修改以与故障分类统计保持一致
  generateFaultDistribution() {
    const faultStats = this.generateFaultTypeStats();
    
    return faultTypes.map(type => {
      const typeStats = faultStats.find(stat => stat.name === type.name);
      const value = typeStats ? 
        (typeStats.critical + typeStats.warning + typeStats.info) : 0;
      
      return {
        name: type.name,
        value,
        category: type.category
      };
    });
  }

  // 生成检测延迟数据
  generateDetectionLatency() {
    // 为每个实例定义基准延迟和波动特征
    const instanceCharacteristics = {
      '实例1': {
        baseLatency: 15,    // 基准延迟较低
        amplitude: 0.15,    // 波动幅度小
        period: 30,         // 周期短
        noise: 0.05        // 噪声小
      },
      '实例2': {
        baseLatency: 22,    // 基准延迟中等
        amplitude: 0.25,    // 波动幅度中等
        period: 60,         // 周期中等
        noise: 0.1         // 噪声中等
      },
      '实例3': {
        baseLatency: 28,    // 基准延迟较高
        amplitude: 0.35,    // 波动幅度大
        period: 90,         // 周期长
        noise: 0.15        // 噪声大
      }
    };

    const now = dayjs();
    const minutes = timeRangeMap[this.timeRange];
    const step = Math.max(1, Math.floor(minutes / 60));
    const data: any[] = [];

    // 为每个实例生成数据
    Object.entries(instanceCharacteristics).forEach(([instance, chars]) => {
      for (let i = minutes - 1; i >= 0; i -= step) {
        const time = now.subtract(i, 'minute');
        const timeStr = time.format('YYYY-MM-DD HH:mm:ss');

        // 生成基于时间的周期性值
        const minuteOfDay = time.hour() * 60 + time.minute();
        const cyclePosition = (2 * Math.PI * minuteOfDay) / chars.period;
        
        // 添加周期性波动
        const cyclicValue = chars.baseLatency * (1 + Math.sin(cyclePosition) * chars.amplitude);
        
        // 添加随机噪声
        const noise = (Math.random() - 0.5) * 2 * chars.noise * chars.baseLatency;
        
        // 计算最终值并确保不小于0
        const value = Math.max(0, cyclicValue + noise);

        data.push({
          time: timeStr,
          instanceName: instance,
          value: Number(value.toFixed(1))  // 保留一位小数
        });
      }
    });

    // 按时间排序
    return data.sort((a, b) => dayjs(a.time).unix() - dayjs(b.time).unix());
  }
} 