from nbt import nbt
import os
import anvil


class AnvilParser():
    def __init__(self, rx, rz):
        self.rx = rx
        self.rz = rz
        self.working_dir = os.path.dirname(os.path.realpath(__file__))
        self.mc_dir = self.working_dir + "/minecraft-data"
        self.region_path = self.mc_dir + "/world/region/r."+str(self.rx)+"."+str(self.rz)+".mca"

    def get_block(self, x, y, z):
        region = anvil.Region.from_file(self.region_path)
        chunk = anvil.Chunk.from_region(region, self.rx, self.rz)

        block = chunk.get_block(x, y, z)

        # print(block)
        # print(block.id)
        # print(block.properties)

        return block.id


class NBTParcer():
    def __init__(self):
        self.working_dir = os.path.dirname(os.path.realpath(__file__))
        self.mc_dir = self.working_dir + "/minecraft-data"
        self.world_dat = self.mc_dir + "/world/level.dat"

    def parse(self):
        nbtfile = nbt.NBTFile(self.world_dat, 'rb')
        print(nbtfile)


class Map():
    def __init__(self):
        self.map = {}
        pass

    def get_world(self):
        for y in range(5):
            self.get_world_plate(100+y)

        print(self.map)


    def get_world_plate(self, y):
        # x, y, z = (15, 40, 1)
        # if x >= 16 or y >= 319 or z >= 16:
        #     return 0
        self.map[y] = {}
        parse_map = AnvilParser(0, 0)

        for i in range(16 * 16):
            gx = (i % 16)
            gz = (i // 16)
            self.map[y][i] = parse_map.get_block(gx, y, gz)



mc_map = Map()
mc_map.get_world()