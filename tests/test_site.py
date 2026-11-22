import json
from pathlib import Path
import unittest

BASE=Path(__file__).resolve().parents[1]

class DemoTest(unittest.TestCase):
    def test_index_has_key_sections(self):
        html=(BASE/'site'/'index.html').read_text(encoding='utf-8')
        for s in ('Новые учебники','Недавно просмотренные','Запросить новые материалы'):
            with self.subTest(section=s): self.assertIn(s,html)

    def test_data_has_unique_ids(self):
        items=json.loads((BASE/'site'/'data'/'tutorials.json').read_text(encoding='utf-8'))
        self.assertGreaterEqual(len(items),3)
        self.assertEqual(len({x['id'] for x in items}),len(items))
        for x in items:
            self.assertTrue(x['title'])
            self.assertTrue(x['description'])

    def test_scripts_do_not_send_requests_to_backend(self):
        script=(BASE/'site'/'assets'/'app.js').read_text(encoding='utf-8')
        self.assertIn('localStorage',script)
        self.assertIn('data/tutorials.json',script)

if __name__=='__main__': unittest.main()
