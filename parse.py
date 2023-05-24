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

        print(block)
        print(block.id)
        print(block.properties)


class NBTParcer():
    def __init__(self):
        self.working_dir = os.path.dirname(os.path.realpath(__file__))
        self.mc_dir = self.working_dir + "/minecraft-data"
        self.world_dat = self.mc_dir + "/world/level.dat"

    def parse(self):
        nbtfile = nbt.NBTFile(self.world_dat, 'rb')
        print(nbtfile)


parse_map = AnvilParser(0, 0)
parse_map.get_block(1, 10, 1)