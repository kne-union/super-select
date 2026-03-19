import createTreeUtils from './createTreeUtils';

describe('createTreeUtils', () => {
  let mapping;
  let treeUtils;

  // 测试数据结构:
  // root1
  //   ├── child1-1
  //   │   ├── child1-1-1
  //   │   └── child1-1-2
  //   └── child1-2
  // root2
  //   └── child2-1
  // root3 (叶子节点)

  const createTestMapping = () => {
    const map = new Map();

    // 根节点
    map.set('root1', { id: 'root1', label: '根节点1', parentId: null });
    map.set('root2', { id: 'root2', label: '根节点2', parentId: null });
    map.set('root3', { id: 'root3', label: '根节点3', parentId: null });

    // root1 的子节点
    map.set('child1-1', { id: 'child1-1', label: '子节点1-1', parentId: 'root1' });
    map.set('child1-2', { id: 'child1-2', label: '子节点1-2', parentId: 'root1' });

    // child1-1 的子节点
    map.set('child1-1-1', { id: 'child1-1-1', label: '子节点1-1-1', parentId: 'child1-1' });
    map.set('child1-1-2', { id: 'child1-1-2', label: '子节点1-1-2', parentId: 'child1-1' });

    // root2 的子节点
    map.set('child2-1', { id: 'child2-1', label: '子节点2-1', parentId: 'root2' });

    // 设置 children 属性
    map.get('root1').children = [map.get('child1-1'), map.get('child1-2')];
    map.get('root2').children = [map.get('child2-1')];
    map.get('child1-1').children = [map.get('child1-1-1'), map.get('child1-1-2')];

    return map;
  };

  beforeEach(() => {
    mapping = createTestMapping();
    treeUtils = createTreeUtils(mapping);
  });

  describe('mapping', () => {
    it('应该返回原始的 mapping', () => {
      expect(treeUtils.mapping).toBe(mapping);
    });
  });

  describe('getSiblingNode', () => {
    it('应该返回根节点的兄弟节点', () => {
      const siblings = treeUtils.getSiblingNode('root1');
      expect(siblings).toHaveLength(3);
      expect(siblings.map(n => n.id)).toEqual(['root1', 'root2', 'root3']);
    });

    it('应该返回子节点的兄弟节点', () => {
      const siblings = treeUtils.getSiblingNode('child1-1');
      expect(siblings).toHaveLength(2);
      expect(siblings.map(n => n.id)).toEqual(['child1-1', 'child1-2']);
    });

    it('应该返回叶子节点的兄弟节点', () => {
      const siblings = treeUtils.getSiblingNode('child1-1-1');
      expect(siblings).toHaveLength(2);
      expect(siblings.map(n => n.id)).toEqual(['child1-1-1', 'child1-1-2']);
    });

    it('节点不存在时应该返回空数组', () => {
      const siblings = treeUtils.getSiblingNode('not-exist');
      expect(siblings).toEqual([]);
    });
  });

  describe('getAllChildren', () => {
    it('应该返回节点的所有子级后代', () => {
      const children = treeUtils.getAllChildren('root1');
      expect(children).toHaveLength(4);
      expect(children.map(n => n.id)).toEqual(['child1-1', 'child1-2', 'child1-1-1', 'child1-1-2']);
    });

    it('叶子节点应该返回空数组', () => {
      const children = treeUtils.getAllChildren('root3');
      expect(children).toEqual([]);
    });

    it('节点不存在时应该返回空数组', () => {
      const children = treeUtils.getAllChildren('not-exist');
      expect(children).toEqual([]);
    });
  });

  describe('findInParents', () => {
    it('应该在父级中找到满足条件的节点', () => {
      const result = treeUtils.findInParents('child1-1-1', node => node.id === 'root1');
      expect(result).not.toBeNull();
      expect(result.id).toBe('root1');
    });

    it('自身满足条件时应该返回自身', () => {
      const result = treeUtils.findInParents('child1-1', node => node.id === 'child1-1');
      expect(result).not.toBeNull();
      expect(result.id).toBe('child1-1');
    });

    it('没有满足条件的节点时应该返回 null', () => {
      const result = treeUtils.findInParents('child1-1', node => node.id === 'root2');
      expect(result).toBeNull();
    });

    it('节点不存在时应该返回 null', () => {
      const result = treeUtils.findInParents('not-exist', () => true);
      expect(result).toBeNull();
    });
  });

  describe('computedCheckboxStatus', () => {
    it('节点被选中时应该返回 checked: true', () => {
      const result = treeUtils.computedCheckboxStatus('root1', ['root1']);
      expect(result).toEqual({ checked: true, indeterminate: false });
    });

    it('父节点被选中时，子节点应该返回 checked: true', () => {
      const result = treeUtils.computedCheckboxStatus('child1-1', ['root1']);
      expect(result).toEqual({ checked: true, indeterminate: false });
    });

    it('部分子节点被选中时应该返回 indeterminate: true', () => {
      const result = treeUtils.computedCheckboxStatus('root1', ['child1-1']);
      expect(result).toEqual({ checked: false, indeterminate: true });
    });

    it('没有选中时应该返回 checked: false, indeterminate: false', () => {
      const result = treeUtils.computedCheckboxStatus('root1', []);
      expect(result).toEqual({ checked: false, indeterminate: false });
    });

    it('深层嵌套的部分选中应该正确判断', () => {
      const result = treeUtils.computedCheckboxStatus('child1-1', ['child1-1-1']);
      expect(result).toEqual({ checked: false, indeterminate: true });
    });
  });

  describe('setNodeChecked', () => {
    it('选中节点应该将其 id 添加到数组', () => {
      const result = treeUtils.setNodeChecked('root3', []);
      expect(result).toContain('root3');
    });

    it('选中节点应该移除其所有子节点', () => {
      const result = treeUtils.setNodeChecked('root1', ['child1-1', 'child1-2']);
      expect(result).toContain('root1');
      expect(result).not.toContain('child1-1');
      expect(result).not.toContain('child1-2');
    });

    it('所有兄弟节点都被选中时应该选中父节点', () => {
      const result = treeUtils.setNodeChecked('child1-2', ['child1-1']);
      expect(result).toContain('root1');
      expect(result).not.toContain('child1-1');
      expect(result).not.toContain('child1-2');
    });

    it('选中叶子节点应该正常工作', () => {
      const result = treeUtils.setNodeChecked('child1-1-1', []);
      expect(result).toContain('child1-1-1');
    });
  });

  describe('setNodeUnchecked', () => {
    it('取消选中节点应该从数组中移除', () => {
      const result = treeUtils.setNodeUnchecked('root3', ['root3']);
      expect(result).not.toContain('root3');
    });

    it('取消选中父节点时，应该选中所有兄弟节点', () => {
      const result = treeUtils.setNodeUnchecked('child1-1', ['root1']);
      expect(result).not.toContain('root1');
      expect(result).toContain('child1-2');
      expect(result).not.toContain('child1-1');
    });

    it('取消选中中间节点应该正确处理', () => {
      const result = treeUtils.setNodeUnchecked('child1-1-1', ['child1-1']);
      expect(result).toContain('child1-1-2');
      expect(result).not.toContain('child1-1-1');
    });
  });

  describe('getSelectedQueue', () => {
    it('应该返回从根到目标节点的路径', () => {
      const result = treeUtils.getSelectedQueue('root1');
      expect(result.length).toBeGreaterThan(0);
      expect(result[0]).toBe('root1');
    });

    it('节点不存在时应该返回空数组', () => {
      const result = treeUtils.getSelectedQueue('not-exist');
      expect(result).toEqual([]);
    });

    it('应该正确处理深层嵌套节点', () => {
      const result = treeUtils.getSelectedQueue('child1-1-1');
      expect(result).toContain('root1');
      expect(result).toContain('child1-1');
      expect(result).toContain('child1-1-1');
    });
  });

  describe('treeData', () => {
    it('应该返回树形结构数据', () => {
      expect(treeUtils.treeData).toHaveLength(3);
      expect(treeUtils.treeData[0].id).toBe('root1');
      expect(treeUtils.treeData[0].children).toHaveLength(2);
    });

    it('叶子节点不应该有 children', () => {
      const root3Node = treeUtils.treeData.find(n => n.id === 'root3');
      expect(root3Node.children).toBeNull();
    });
  });

  describe('treeMapping', () => {
    it('应该返回根节点的映射', () => {
      expect(treeUtils.treeMapping.has('root1')).toBe(true);
      expect(treeUtils.treeMapping.has('root2')).toBe(true);
      expect(treeUtils.treeMapping.has('root3')).toBe(true);
    });

    it('映射中的节点应该包含 children 属性', () => {
      const root1Node = treeUtils.treeMapping.get('root1');
      expect(root1Node.children).toHaveLength(2);
    });
  });

  describe('边界情况', () => {
    it('空 mapping 应该正常处理', () => {
      const emptyUtils = createTreeUtils(new Map());
      expect(emptyUtils.treeData).toBeNull();
      expect(emptyUtils.getAllChildren('any')).toEqual([]);
      expect(emptyUtils.getSiblingNode('any')).toEqual([]);
    });

    it('只有根节点的 mapping 应该正常处理', () => {
      const singleMap = new Map();
      singleMap.set('root', { id: 'root', label: 'Root', parentId: null });
      const singleUtils = createTreeUtils(singleMap);

      expect(singleUtils.treeData).toHaveLength(1);
      expect(singleUtils.getAllChildren('root')).toEqual([]);
      expect(singleUtils.getSiblingNode('root')).toHaveLength(1);
    });

    it('value 为空数组时 computedCheckboxStatus 应该正常工作', () => {
      const result = treeUtils.computedCheckboxStatus('root1', []);
      expect(result).toEqual({ checked: false, indeterminate: false });
    });

    it('value 为 undefined 时 computedCheckboxStatus 应该正常工作', () => {
      const result = treeUtils.computedCheckboxStatus('root1', undefined);
      expect(result).toEqual({ checked: false, indeterminate: false });
    });
  });
});
